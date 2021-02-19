const { ApiPromise, WsProvider } = require('@polkadot/api');
const { Keyring } = require('@polkadot/keyring');
const { ContractPromise } = require('@polkadot/api-contract');

const keyring = new Keyring({ type: 'sr25519' });

const BalanceOf = async({abi, address, call_from, owner}) => {
  const wsProvider = new WsProvider('wss://rpc-testnet.selendra.org');
  const api = await ApiPromise.create({ provider: wsProvider });
  const contract = new ContractPromise(api, abi, address);

  const result = await contract.query.balanceOf(call_from, 0, -1, owner);
  return { balanceOf: result.output.toString() };
}

const TotalSupply = async({abi, address, call_from }) => {
  const wsProvider = new WsProvider('wss://rpc-testnet.selendra.org');
  const api = await ApiPromise.create({ provider: wsProvider });
  const contract = new ContractPromise(api, abi, address);

  const result = await contract.query.totalSupply(call_from, 0, -1);
  return { totalSupply: result.output.toString() };
}

const Allowance = async({abi, address, call_from, owner, spender}) => {
  const wsProvider = new WsProvider('wss://rpc-testnet.selendra.org');
  const api = await ApiPromise.create({ provider: wsProvider });
  const contract = new ContractPromise(api, abi, address);

  const result = await contract.query.allowance(call_from, 0, -1, owner, spender);
  return { allowance: result.output.toString() };
}

const Approve = async({abi, address, call_from, spender, value}) => {
  const wsProvider = new WsProvider('wss://rpc-testnet.selendra.org');
  const api = await ApiPromise.create({ provider: wsProvider });
  const contract = new ContractPromise(api, abi, address);

  const pair = keyring.createFromUri(call_from);

  const result = await contract.tx.approve(0, -1, spender, value).signAndSend(pair);
  return { hash: result.toHex() };
}

const Transfer = async({abi, address, call_from, to, value}) => {
  const wsProvider = new WsProvider('wss://rpc-testnet.selendra.org');
  const api = await ApiPromise.create({ provider: wsProvider });
  const contract = new ContractPromise(api, abi, address);
  
  const pair = keyring.createFromUri(call_from);

  const result = await contract.tx.transfer(0, -1, to, value).signAndSend(pair);
  return { hash: result.toHex() };  
}

const TransferFrom = async({abi, address, call_from, from, to, value}) => {
  const wsProvider = new WsProvider('wss://rpc-testnet.selendra.org');
  const api = await ApiPromise.create({ provider: wsProvider });
  const contract = new ContractPromise(api, abi, address);

  const pair = keyring.createFromUri(call_from);
  const result = await contract.tx.transferFrom(0, -1, from, to, value).signAndSend(pair);
  return { hash: result.toHex() };
}

module.exports = {
  BalanceOf,
  TotalSupply,
  Allowance,
  Approve,
  Transfer,
  TransferFrom
}