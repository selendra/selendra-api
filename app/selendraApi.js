const selendraTypes = require('../types/selendraType');
const { cryptoWaitReady } = require('@polkadot/util-crypto');
const { isValidSubstrateAddress, WalletFromMnemonic } = require('./wallet')
const API = require("@polkadot/api");
const Web3 = require("web3")

class SelendraApi {
    constructor(wsProvider, type) {
        this.wsProvider = wsProvider;
        this.type = type;
    }

    async connect() {
        const wsProvider = new API.WsProvider(this.wsProvider);
        const api = await API.ApiPromise.create({
            provider: wsProvider,
            types: this.type
        });
        return api;
	}

    async chainInfo() {
        const api = await this.connect();
        const [chain, nodeName, nodeVersion] = await Promise.all([
            api.rpc.system.chain(),
            api.rpc.system.name(),
            api.rpc.system.version(),
        ]);
        return [chain, nodeName, nodeVersion];
    }

    async checkBalance(address) {
        const api = await this.connect();
        const { data: balance } = await api.query.system.account(address);
        const balances = balance.free / Math.pow(10, api.registry.chainDecimals);
        return balances;
    }

    async transferBalance(wallet, address, amount) {
        const api = await this.connect();
        const transferAmount = BigInt(amount * Math.pow(10, api.registry.chainDecimals));
        const transfer = api.tx.balances.transfer(address, transferAmount);
        const hash = await transfer.signAndSend(wallet);
        return hash
    }

    async bindDefaultAccount(mnemonic, rpc = "http://localhost:9933", keyType = "sr25519", ss58Format = 972 ) {
        const api = await this.connect();
        const web3 = new Web3(rpc);

        const account = new WalletFromMnemonic(mnemonic, keyType, ss58Format);
        const etherWallet= await account.etherWallet();
        const substrateWallet = await account.substrateWallet();
        
        web3.eth.accounts.wallet.add(etherWallet.privateKey);
        let signature = await web3.eth.sign(`Selendra evm:${web3.utils.bytesToHex(substrateWallet.publicKey).slice(2)}`, etherWallet.address);
      
        let nonce = await api.rpc.system.accountNextIndex(substrateWallet.address);
        
        await api.tx.evmAccounts
            .claimAccount(etherWallet.address, web3.utils.hexToBytes(signature))
            .signAndSend(substrateWallet, { nonce});

        return signature
    }
}

class DefaultSelendraApi extends SelendraApi {
    constructor() {
        super("ws://127.0.0.1:9944", selendraTypes)
    }
}


module.exports.SelendraApi = SelendraApi;
module.exports.DefaultSelendraApi = DefaultSelendraApi;
