const constants = require('./constants');
const { cryptoWaitReady } = require('@polkadot/util-crypto');
const { Keyring } = require( '@polkadot/keyring');
const API = require("@polkadot/api");
const { ethers} = require('ethers');

class SelendraApi {
    constructor() {
        this.subUrl = constants.SUBURL;
        this.type = constants.TYPES;
        this.ss58Format = constants.SS58FORMAT;
        this.ethUrl = constants.ETHURL;
        this.ethchainId = constants.ETHCHAINID;
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
}

module.exports.Api = SelendraApi;
