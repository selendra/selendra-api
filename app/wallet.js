const { Keyring, decodeAddress, encodeAddress } = require( '@polkadot/keyring');
const { hexToU8a, isHex } = require('@polkadot/util');
const { cryptoWaitReady } = require('@polkadot/util-crypto');
const { ethers} = require('ethers');

class WalletFromMnemonic {
    constructor(mnemonic, type, ss58Format) {
            this.mnemonic = mnemonic;
            this.type = type;
            this.ss58Format = ss58Format;
    }

    async substrateWallet() {
        await cryptoWaitReady();
        const keyring = new Keyring({ type: this.type, ss58Format: this.ss58Format });
        const wallet = keyring.createFromUri(this.mnemonic);
        return wallet
    }

    async etherWallet() {
      let wallet = ethers.Wallet.fromMnemonic(this.mnemonic);
      return wallet
    }
}

class DefaultSelendraWallet extends WalletFromMnemonic {
    constructor(mnemonic) {
        super(mnemonic, 'sr25519', 972)
    }
}

const isValidSubstrateAddress = (address) => {
  try {
    encodeAddress(
      isHex(address)
        ? hexToU8a(address)
        : decodeAddress(address)
    );

    return true;
  } catch (error) {
    return false;
  }
};

module.exports.WalletFromMnemonic = WalletFromMnemonic;
module.exports.DefaultSelendraWallet = DefaultSelendraWallet;
module.exports.isValidSubstrateAddress = isValidSubstrateAddress;