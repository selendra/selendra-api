# Selendra JS

![logo](https://user-images.githubusercontent.com/38589050/108470717-f6810200-72bc-11eb-99dc-47b00e008f32.png)

Selendra javascript SDK for intergration with selendra.

## Getting Started
## Table of Contents
* [Installation](#installation)
* [Feature](#feature)
* [Usage](#usage)
* [User Guide](#user-guide)
* [License](#license)

<a name="installation"></a>
## Installation
* with Npm
```sh
npm install selendra-js
```
* with Yarn
```sh
yarn add selendra-js
```

<a name='feature'></a>

## Feature
1. Create Account
2. Import Account
3. Get Balance
4. Transfer Balance
5. Transfer Batch ( Transfer balance to many account at the same time )
6. Transaction with ERC-20
 * Approve
 * Transfer
 * TransferFrom
 * Allowance
 * BalanceOf
 * Total Supply  

<a name='usage'></a>
## Usage
* Import 
```js
const { CreateAccount, ImportAccount, TransferBalance } = require('selendra-js');
```
* Create Account
```js
CreateAccount({
   type
}).then((res) => {
   console.log(res.mnemonic, res.pair);
})
```
* Import Account
```js
ImportAccount({
   type
}).then((res) => {
   console.log(res.pair);
})
```
* Get Balance
```js
GetBalance({
   address
}).then((res) => {
   console.log(res.balances)
})
```
* TransferBalance
```js
TransferBalance({
   seed,
   receiverAddress, 
   amount
}).then((res) => {
   console.log(res.hash);
})
```
* TransferBatch
```js
TransferBatch({
   seed,
   data: [
      { receiverAddress: '', amount: '' }
   ]
}).then((res) => {
   console.log(res.hash);
})
```
### Contract ERC-20
* Approve
```js
const { Approve } = require('selendra-js')
Approve({
   abi,
   address, 
   call_from,
   spender,
   value
}).then((res) => {
   console.log(res.hash);
})
```
* Transfer
```js
const { Transfer } = require('selendra-js')
Transfer({
   abi,
   address, 
   call_from,
   to,
   value
}).then((res) => {
   console.log(res.hash);
})
```
* TransferFrom
```js
const { TransferFrom } = require('selendra-js')
TransferFrom({
   abi,
   address, 
   call_from,
   from,
   to,
   value
}).then((res) => {
   console.log(res.hash);
})
```
* Allowance
```js
const { Allowance } = require('selendra-js')
Allowance({
   abi,
   address, 
   call_from,
   owner,
   spender
}).then((res) => {
   console.log(res.allowance);
})
```
* BalanceOf
```js
const { BalanceOf } = require('selendra-js')
BalanceOf({
   abi,
   address, 
   call_from,
   owner
}).then((res) => {
   console.log(res.balanceOf);
})
```
* Total Supply
```js
const { TotalSupply } = require('selendra-js')
TotalSupply({
   abi,
   address, 
   call_from
}).then((res) => {
   console.log(res.hash);
})
```

<a name='user-guide'></a>
## User Guide
Props

| Prop Name | Description  | Default Value | Example |
| ------------- | --------------  | --------------- | ----------- |
| type | Account keys are keys that are meant to control funds. They can be either: 'sr25519' or 'ed25519'  | sr25519 | type: 'sr25519' |
| seed | The seed is your key to the account. Knowing the seed allows you, or anyone else who knows the seed, to re-generate and control this account.  | null | seed: '//Alice' |
| receiverAddress | The wallet address of the receiver. | null | receiverAddress: 'Bob ' |
| amount | Amount to send.  | null | amount: '10' |
| Contract ERC-20 |
| abi | The ABI for the WASM code. The ABI is required and stored for future operations such as sending messages.  | null | .json file |
| address | Address of the Contract.  | null | address: 'Bob' |
| call_from | Specify the user account to use for the contract call and fees will be deducted from this account.(Approve, Transfer, TransferFrom:  'call_from' must be a rawSeed)  | null | call_from: 'Bob' |

<a name='license'></a>
## License
Apache License 2.0
