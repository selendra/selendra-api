const { ApiPromise, WsProvider } = require('@polkadot/api');
const { Keyring } = require('@polkadot/keyring');
const { ContractPromise } = require('@polkadot/api-contract');
const BigNumber = require("bignumber.js");

const keyring = new Keyring({ type: 'sr25519' });

const BalanceOf = async({abi, address, from, target}) => {
  const wsProvider = new WsProvider('wss://rpc-testnet.selendra.org');
  const api = await ApiPromise.create({ provider: wsProvider });
  const contract = new ContractPromise(api, abi, address);

  const result = await contract.query.balanceOf(from, 0, -1, target);
  console.log(result.output.toString());
  return result.output.toString();
}

const TotalSupply = async({abi, address, from }) => {
  const wsProvider = new WsProvider('wss://rpc-testnet.selendra.org');
  const api = await ApiPromise.create({ provider: wsProvider });
  const contract = new ContractPromise(api, abi, address);

  const result = await contract.query.totalSupply(from, 0, -1);
  console.log(result.output.toString());
  return result.output.toString();
}

const Allowance = async({abi, address, from, owner, spender}) => {
  const wsProvider = new WsProvider('wss://rpc-testnet.selendra.org');
  const api = await ApiPromise.create({ provider: wsProvider });
  const contract = new ContractPromise(api, abi, address);

  const result = await contract.query.allowance(from, 0, -1, owner, spender);
  console.log(result.output.toString());
  return result.output.toString();
}

const Approve = async({abi, address, from, value}) => {
  const wsProvider = new WsProvider('wss://rpc-testnet.selendra.org');
  const api = await ApiPromise.create({ provider: wsProvider });
  const contract = new ContractPromise(api, abi, address);

  const pair = keyring.createFromUri(from);

  const result = await contract.tx.approve(0, -1, from, value).signAndSend(pair);
  console.log(result.toHex());
  return result.toHex();
}

const Transfer = async({abi, address, sender, to, value}) => {
  const wsProvider = new WsProvider('wss://rpc-testnet.selendra.org');
  const api = await ApiPromise.create({ provider: wsProvider });
  const contract = new ContractPromise(api, abi, address);
  
  const pair = keyring.createFromUri(sender);

  const result = await contract.tx.transfer(0, -1, to, value).signAndSend(pair);
  console.log(result.toHex());
  return result.toHex();
}

const TransferFrom = async({abi, address, sender, from, to, value}) => {
  const wsProvider = new WsProvider('wss://rpc-testnet.selendra.org');
  const api = await ApiPromise.create({ provider: wsProvider });
  const contract = new ContractPromise(api, abi, address);

  const pair = keyring.createFromUri(sender);
  const result = await contract.tx.transferFrom(0, -1, from, to, value).signAndSend(pair);
  console.log(result.toHex());
  return result.toHex();
}

module.exports = {
  BalanceOf,
  TotalSupply,
  Allowance,
  Approve,
  Transfer,
  TransferFrom
}