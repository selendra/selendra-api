const { ApiPromise, WsProvider } = require('@polkadot/api');
const { Keyring } = require('@polkadot/keyring');
const { ContractPromise } = require('@polkadot/api-contract');
const BigNumber = require("bignumber.js");

const keyring = new Keyring({ type: 'sr25519' });

const BalanceOf = async({abi, address, from, target}) => {
  const wsProvider = new WsProvider('wss://rpc-testnet.selendra.org');
  const api = await ApiPromise.create({ provider: wsProvider });
  const contract = new ContractPromise(api, abi, '5Cd5QLMBBNtk3YoWC2ftGGG6shiQ8r1SRGyCgeHJgyX1ByLZ');

  const result = await contract.query.balanceOf('5DM3W28EeKBmZnikwoQNJg9ex5PFdJARNgtkkgTMiu5oi2hG', 0, -1, '5DyrcNaxtTyCjF5873oRUzpXjngTBf5Mv33puwKFdEFqgqdc');
  console.log(result.output.toString());
  return result.output.toString();
}

const TotalSupply = async({abi, address, from }) => {
  const wsProvider = new WsProvider('wss://rpc-testnet.selendra.org');
  const api = await ApiPromise.create({ provider: wsProvider });
  const contract = new ContractPromise(api, abi, '5HVhS6Eh9XQHgdVYAuq2Bj3S3UW8dsWt2qrNa89K2TqY5Ypp');

  const result = await contract.query.totalSupply('5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY', 0, -1);
  console.log(result.output.toString());
  return result.output.toString();
}

const Allowance = async({abi, address, from, owner, spender}) => {
  const wsProvider = new WsProvider('wss://rpc-testnet.selendra.org');
  const api = await ApiPromise.create({ provider: wsProvider });
  const contract = new ContractPromise(api, abi, '5HVhS6Eh9XQHgdVYAuq2Bj3S3UW8dsWt2qrNa89K2TqY5Ypp');

  const result = await contract.query.allowance(from, 0, -1, owner, spender);
  console.log(result.output.toString());
  return result.output.toString();
}

const Approve = async({abi, address, from, value}) => {
  const wsProvider = new WsProvider('wss://rpc-testnet.selendra.org');
  const api = await ApiPromise.create({ provider: wsProvider });
  const contract = new ContractPromise(api, abi, '5HVhS6Eh9XQHgdVYAuq2Bj3S3UW8dsWt2qrNa89K2TqY5Ypp');

  const pair = keyring.createFromUri(from);

  const result = await contract.tx.approve(0, -1, from, approveValue.toFixed()).signAndSend(pair);
  console.log(result.toHex());
  return result.toHex();
}

const Transfer = async({abi, address, sender, to, value}) => {
  const wsProvider = new WsProvider('wss://rpc-testnet.selendra.org');
  const api = await ApiPromise.create({ provider: wsProvider });
  const contract = new ContractPromise(api, abi, '5Cd5QLMBBNtk3YoWC2ftGGG6shiQ8r1SRGyCgeHJgyX1ByLZ');
  
  const pair = keyring.createFromUri(sender);

  const result = await contract.tx.transfer(0, -1, to, '1').signAndSend(pair);
  console.log(result.toHex());
  return result.toHex();
}

const TransferFrom = async({abi, address, sender, from, to, value}) => {
  const wsProvider = new WsProvider('wss://rpc-testnet.selendra.org');
  const api = await ApiPromise.create({ provider: wsProvider });
  const contract = new ContractPromise(api, abi, '5HVhS6Eh9XQHgdVYAuq2Bj3S3UW8dsWt2qrNa89K2TqY5Ypp');

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