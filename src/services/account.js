const { ApiPromise, WsProvider } = require('@polkadot/api');
const { Keyring } = require('@polkadot/keyring');
const { mnemonicGenerate, mnemonicValidate, cryptoWaitReady } = require('@polkadot/util-crypto');
const BigNumber = require("bignumber.js");

const keyring = new Keyring({ type: 'sr25519', ss58Format: 2 });

const CreateAccount = async ({type}) => {
  await cryptoWaitReady();
  try {
    if(!type) throw new Error ('type could not be null');
    
    const mnemonic = mnemonicGenerate(12);
    const pair = keyring.addFromUri(mnemonic, {}, type);
    return { mnemonic, pair };
  } catch (error) {
    console.log(error);
  }
}

const ImportAccount = async ({seed, type}) => {
  await cryptoWaitReady();
  try {
    if(mnemonicValidate(seed) === false) throw new Error ('Seed is not valid!');
    if(!seed) throw new Error ('seed could not be null');
    if(!type) throw new Error ('type could not be null');
    
    const pair = keyring.addFromUri(seed, {} ,type);
    return { pair };
  } catch (error) {
    console.log(error);
  }
}

const Transfer = async({receiverAddress, seed, amount}) => {
  const wsProvider = new WsProvider('wss://rpc-testnet.selendra.org');
  const api = await ApiPromise.create({ provider: wsProvider });
  
  if(!seed) throw new Error ('raw seed could not be null');
  if(mnemonicValidate(seed) === false) throw new Error ('Seed is not valid!');
  if(!receiverAddress) throw new Error ('receiver address could not be null');
  if(!amount || amount <= 0) throw new Error ('amount should be a unique value');

  const senderPair = keyring.createFromUri(seed);

  let chainDecimals = (10 ** api.registry.chainDecimals);
  let transferBalance = new BigNumber(amount * chainDecimals);

  const transfer = api.tx.balances.transfer(receiverAddress, transferBalance.toFixed());
  const hash = await transfer.signAndSend(senderPair);
  return { hash: hash.toHex() };
}

module.exports = {
  CreateAccount,
  ImportAccount,
  Transfer
};