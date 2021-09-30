const constants = require('./constants');
const { cryptoWaitReady } = require('@polkadot/util-crypto');
const { Keyring } = require( '@polkadot/keyring');
const API = require("@polkadot/api");
const { ethers} = require('ethers');
const Web3 = require('web3');

class Api {
    constructor(subUrl, type, ss58Format, ethUrl, ethchainId, evmchainId) {
        this.subUrl = subUrl;
        this.type = type;
        this.ss58Format = ss58Format;
        this.ethUrl = ethUrl;
        this.ethchainId = ethchainId;
        this.evmchainId = evmchainId;
    }

    async substrateConnet() {
        const wsProvider = new API.WsProvider(this.subUrl);
        const api = await API.ApiPromise.create({
            provider: wsProvider,
            types: this.type
        });
        return api;
	}

    async etherConnet() {
        const provider = new ethers.providers.StaticJsonRpcProvider(
            this.ethUrl, {chainId: this.ethchainId}
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

    async nativeToWrap(substrateAccount, to, amount) {
        const api = await this.substrateConnet();
        const transferAmount = BigInt(amount * Math.pow(10, api.registry.chainDecimals));

        const nonce = await api.rpc.system.accountNextIndex(substrateAccount.address);
        const hash = await api.tx.bridgeTransfer
            .transferNative(transferAmount, to, this.evmchainId)
            .signAndSend(substrateAccount, { nonce});

        return hash
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
        constants.EVM_CHAINID
        )
    }
}

module.exports.Api = Api;
module.exports.developmentApi = developmentApi;
