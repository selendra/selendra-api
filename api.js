const { mnemonicGenerate, mnemonicValidate} = require('@polkadot/util-crypto');

const selendraTypes = require('./types/selendraType');
const { DefaultSelendraApi, SelendraApi} = require('./app/selendraApi');
const { WalletFromMnemonic, DefaultSelendraWallet, isValidSubstrateAddress } = require('./app/wallet');

module.exports = {
    selendraTypes,
    mnemonicGenerate,
    mnemonicValidate,
    isValidSubstrateAddress,
    DefaultSelendraApi,
    SelendraApi,
    WalletFromMnemonic,
    DefaultSelendraWallet,
    
}