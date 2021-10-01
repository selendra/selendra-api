const constants = require('./constants');
const API = require("@polkadot/api");
const { cryptoWaitReady } = require('@polkadot/util-crypto');
const { u8aToHex } = require('@polkadot/util');
const { Keyring } = require( '@polkadot/keyring');
const { ethers} = require('ethers');

class Api {
    constructor(subUrl, type, ss58Format, ethUrl, ethchainId, evmUrl, evmchainId, bridgeConstract, bridgeid, resourceId) {
        this.subUrl = subUrl;
        this.type = type;
        this.ss58Format = ss58Format;
        this.ethUrl = ethUrl;
        this.ethchainId = ethchainId;
        this.evmUrl = evmUrl;
        this.evmchainId = evmchainId;
        this.bridgeConstract = bridgeConstract;
        this.bridgeid = bridgeid;
        this.resourceId = resourceId;
    }

    async substrateConnet() {
        const wsProvider = new API.WsProvider(this.subUrl);
        const api = await API.ApiPromise.create({
            provider: wsProvider,
            types: this.type
        });
        return api;
	}

    async etherConnet(url = this.ethUrl, chainid = this.ethchainId) {
        const provider = new ethers.providers.StaticJsonRpcProvider(
            url, {chainId: chainid}
        );
        return provider;
    }

    async substrateAccount(mnemonic, keyType = 'sr25519') {
        await cryptoWaitReady();
        const keyring = new Keyring({ type: keyType, ss58Format: this.ss58Format });

        const subAccount = keyring.createFromUri(mnemonic);
        return subAccount;
    }

    etherAccount(mnemonic) {
        let ethAccount = ethers.Wallet.fromMnemonic(mnemonic);
        return ethAccount;
    }

    async getAccountHex(substrateAccount) { 
        const accountHex = u8aToHex(substrateAccount.publicKey);
        return accountHex; 
    }

    async checkSubstrateBalance(address) {
        const api = await this.substrateConnet();
    
        const { data: balance } = await api.query.system.account(address);
        const balances = balance.free / Math.pow(10, api.registry.chainDecimals);
        return balances;
    }

    async checkEtherBalance(address) {
        const provider = await this.etherConnet();

        const balances = await provider.getBalance(address);
        const balance = ethers.utils.formatEther(balances);
        return balance;
    }

    async subtrateTransfer(substrateAccount, to, amount) {
        const api = await this.substrateConnet();

        const transferAmount = BigInt(amount * Math.pow(10, api.registry.chainDecimals));
        const transfer = api.tx.balances.transfer(to, transferAmount);
        const hash = await transfer.signAndSend(substrateAccount);
        return hash
    }

    async etherTransfer(etherPrivateKey, to, amount) {
        const provider = await this.etherConnet();
        let wallet = new ethers.Wallet(etherPrivateKey, provider);
    
        const tx = { to: to, value: ethers.utils.parseEther(amount)};
        const createReceipt = await wallet.sendTransaction(tx);
        await createReceipt.wait();
        return createReceipt.hash;
    }

    async bindAccount(substrateAccount, etherAccount) {
        const api = await this.substrateConnet();
        const provider = await this.etherConnet();

        const ether = new ethers.Wallet(etherAccount.privateKey, provider);
        const signature = await ether.signMessage(`Selendra evm:${ethers.utils.hexlify(substrateAccount.publicKey).slice(2)}`, etherAccount.address);
        
        const nonce = await api.rpc.system.accountNextIndex(substrateAccount.address);
        const hash = await api.tx.evmAccounts
            .claimAccount(etherAccount.address, signature)
            .signAndSend(substrateAccount, { nonce});

        return hash
    }

    async nativeToWrap(substrateAccount, recipient, amount) {
        const api = await this.substrateConnet();
        const transferAmount = BigInt(amount * Math.pow(10, api.registry.chainDecimals));

        const nonce = await api.rpc.system.accountNextIndex(substrateAccount.address);
        const hash = await api.tx.bridgeTransfer
            .transferNative(transferAmount, recipient, this.evmchainId)
            .signAndSend(substrateAccount, { nonce});

        return hash
    }

    async wrapTOnative(ethPrivatekey, recipient, amount){
        const provider = await this.etherConnet(this.evmUrl, this.evmchainId);
        const wallet = new ethers.Wallet(ethPrivatekey, provider);

        const bridgeInstance = new ethers.Contract(
            constants.BRIDGECONTRACT, constants.ContractABIs.Bridge.abi, wallet,
        );
        const data = '0x' +
                ethers.utils.hexZeroPad(ethers.BigNumber.from(amount).toHexString(), 32).substr(2) +    // Deposit Amount        (32 bytes)
                ethers.utils.hexZeroPad(ethers.utils.hexlify((recipient.length - 2)/2), 32).substr(2) +    // len(recipientAddress) (32 bytes)
                recipient.substr(2);
        const tx = await bridgeInstance.deposit(
            this.bridgeid,
            this.resourceId,
            data,
            { gasLimit: 2000000}
        );

        return tx.hash
    }
}

class developmentApi extends Api {
    constructor() {
        super(
        constants.SUBURL,
        constants.TYPES,
        constants.SS58FORMAT,
        constants.ETHURL,
        constants.ETHCHAINID,
        constants.EVM_URL,
        constants.EVM_CHAINID,
        constants.BRIDGECONTRACT,
        constants.BRIDGEID,
        constants.RESOURDID
        )
    }
}

module.exports.Api = Api;
module.exports.developmentApi = developmentApi;
