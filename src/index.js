import { ApiPromise, WsProvider } from '@polkadot/api';
import { Keyring } from '@polkadot/keyring';
import { mnemonicGenerate, mnemonicValidate } from '@polkadot/util-crypto';
import BigNumber from "bignumber.js";

const CreateAccount = async ({username, type}) => {
  const keyring = new Keyring({ type: 'sr25519', ss58Format: 2 });
  const mnemonic = mnemonicGenerate(12);
  if(!username) throw new Error ('username could not be null');
  if(!type) throw new Error ('type could not be null');
  const pair = keyring.addFromUri(mnemonic, { name: username }, type);
  return { mnemonic, pair };
}

const ImportAccount = async ({seed, type}) => {
  const keyring = new Keyring({ ss58Format: 2 });
  if(mnemonicValidate(seed) === false) throw new Error ('Seed is not valid!');
  if(!seed) throw new Error ('seed could not be null');
  if(!type) throw new Error ('type could not be null');
  const pair = keyring.addFromUri(seed, {} ,type);
  return { pair };
}

const Transfer = async({receiverAddress, seed, amount}) => {
  const wsProvider = new WsProvider('wss://rpc-testnet.selendra.org');
  const api = await ApiPromise.create({ provider: wsProvider });
  const keyring = new Keyring({ type: 'sr25519', ss58Format: 2 });
  
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

export { 
  CreateAccount,
  ImportAccount,
  Transfer
};