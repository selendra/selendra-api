const {
  DefaultSelendraApi,
  DefaultSelendraWallet,
  WalletFromMnemonic,
  mnemonicGenerate,
  mnemonicValidate,
  isValidSubstrateAddress,
} = require('../api');
const assert = require('assert');

describe('Selendra Api', function() {
    it('should get chain info', async function() {
      const api = await new DefaultSelendraApi();
      let info = await api.chainInfo();
      assert.notEqual(info[0], "");
      assert.notEqual(info[1], "");
      assert.notEqual(info[2], "");
    });

    it('should get equal substrate address', async function() {
      let mnemonic = "cover october pool token actress empty violin unusual cannon agent fortune pulse";
      let wallet = await new DefaultSelendraWallet(mnemonic).substrateWallet();
      assert.equal(wallet.address, "ses4v38o3oLrjEcMeNpDT7cNiVYRjptyyaxHGTNYmJic5PZw4")
    });

    it('should not get equal selendra address', async function() {
        const mnemonic = mnemonicGenerate();
        let wallet = await new WalletFromMnemonic(mnemonic, 'sr25519', 972).substrateWallet();
        assert.notEqual(wallet.address, "ses4v38o3oLrjEcMeNpDT7cNiVYRjptyyaxHGTNYmJic5PZw4")
    });

    it('should get equal ether address', async function() {
      let mnemonic = "cover october pool token actress empty violin unusual cannon agent fortune pulse";
      let wallet = await new DefaultSelendraWallet(mnemonic).etherWallet();
      assert.equal(wallet.address, "0x7ef6c005bd86F1D5c7a2f41A2ec2bddd636beb66")
    });

    it('should get valid mnemonic', async function() {
      const mnemonic = mnemonicGenerate();
      const isValidMnemonic = mnemonicValidate(mnemonic);
      assert.equal(isValidMnemonic, true)
    });

    it('should get valid selendra address', async function() {
      const address = "ses4v38o3oLrjEcMeNpDT7cNiVYRjptyyaxHGTNYmJic5PZw4";
      const isValid = isValidSubstrateAddress(address);
      assert.equal(isValid, true)
    });
    
    after(function() {
        process.exit(1)
    })
});



