<p align="center">
  <h3 align="center">README</h3>
  <p align="center">
    <br />
    <a href="https://github.com/selendra/indra-js"><strong>Explore the docs »</strong></a>
    <br />
  </p>
</p>

<!-- GETTING STARTED -->
## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Installation
* npm
  ```sh
  npm install indra-js
  ```
* yarn
  ```sh
  yarn add indra-js
  ```

### Usage
* import
  ```sh
  import { CreateAccount, ImportAccount, Transfer } from 'indra-js';
  ```
* Create Account
  ```
  const res = await CreateAccount({ username, type });
  console.log(res.mnemonic, res.pair);
  ```
* Import Account
  ```
  const res = await ImportAccount({ seed, type });
  console.log(res.pair);
  ```
* Transfer
  ```
  const res = await Transfer({ seed, receiverAddress, amount });
  console.log(res.hash);
  ```