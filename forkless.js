// Import the API & Provider and some utility functions
const { ApiPromise, WsProvider } = require('@polkadot/api');
const { cryptoWaitReady } = require('@polkadot/util-crypto');
const { Keyring } = require( '@polkadot/keyring');
const fs = require('fs');

async function main (mnemonic) {
    const provider = new WsProvider('ws://127.0.0.1:9944');

    const api = await ApiPromise.create({ provider });
    const adminId = await api.query.sudo.key();

    await cryptoWaitReady();
    const keyring = new Keyring({ type: "sr25519", ss58Format: 972 });
    const adminPair = keyring.createFromUri(mnemonic);

    // Retrieve the runtime to upgrade
    const code = fs.readFileSync('../selendra-chain/target/release/wbuild/selendra-runtime/selendra_runtime.compact.compressed.wasm').toString('hex');
    const proposal = api.tx.system && api.tx.system.setCode
        ? api.tx.system.setCode(`0x${code}`) // For newer versions of Substrate
        : api.tx.consensus.setCode(`0x${code}`); // For previous versions

    console.log(`Upgrading from ${adminId}, ${code.length / 2} bytes`);

    // Perform the actual chain upgrade via the sudo module
    api.tx.sudo
        .sudoUncheckedWeight(proposal, 0)
        .signAndSend(adminPair, ({ events = [], status }) => {
        console.log('Proposal status:', status.type);
        
        if (status.isFinalized) {
            console.log('Finalized block hash');
            process.exit(0);
        }
    });
}

main("emotion maximum mix before crystal champion group ticket service broken reason uniform").catch((error) => {
  console.error(error);
  process.exit(-1);
});