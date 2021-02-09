
# Indra JS

![Selendra_Polygon_SVG](https://user-images.githubusercontent.com/38589050/107327446-bc0aae80-6adf-11eb-8ba2-2c9741d1f296.png)

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
npm install indra-js
```
* with Yarn
```sh
yarn add indra-js
```

<a name='feature'></a>

## Feature
1. Create Account
2. Import Account
3. Transfer Balance

<a name='usage'></a>
## Usage
* Import 
```js
const { CreateAccount, ImportAccount, Transfer } = require('indra-js');
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
*Transfer
```js
Transfer({
   seed,
   receiverAddress, 
   amount
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

<a name='license'></a>
## License
MIT