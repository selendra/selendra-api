const { 
    mnemonicGenerate,
    mnemonicValidate,
    DefaultSelendraWallet,
    isValidSubstrateAddress,
    WalletFromMnemonic,
} = require('../api');

async function getAccountWithDefaul() { 
    let mnemonic = "cover october pool token actress empty violin unusual cannon agent fortune pulse";
    let wallet = await new DefaultSelendraWallet(mnemonic).substrateWallet();
    console.log(wallet.address)
    process.exit(1)
}

async function getAccountFromMnemonic() { 
    const mnemonic = mnemonicGenerate();
    let wallet = await new WalletFromMnemonic(mnemonic, 'sr25519', 972).substrateWallet();
    console.log(wallet.address)
    process.exit(1)
}

async function getEtherPrivateKey() { 
    let mnemonic = "cover october pool token actress empty violin unusual cannon agent fortune pulse";
    let wallet = await new DefaultSelendraWallet(mnemonic).etherWallet();
    console.log(wallet.privateKey)
    process.exit(1)
}

function generateMnemonic() {
    const mnemonic = mnemonicGenerate();
    console.log(`Generated mnemonic: ${mnemonic}`);
}

function checkMnemonic() {
    const mnemonic = mnemonicGenerate();
    const isValidMnemonic = mnemonicValidate(mnemonic);
    console.log(`mnemonic ${mnemonic} isValidMnemonic: ${isValidMnemonic}`);
}

function checkVaildSubstrateAddree() {
    const address = "ses4v38o3oLrjEcMeNpDT7cNiVYRjptyyaxHGTNYmJic5PZw4";
    const isValid = isValidSubstrateAddress(address);
    console.log(`address valid: ${isValid}`)
}


