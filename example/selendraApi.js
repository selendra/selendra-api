const { ethers} = require('ethers');
const { 
    DefaultSelendraApi, selendraTypes, SelendraApi,
    DefaultSelendraWallet,
} = require('../api');

async function get() { 
    let api = await new SelendraApi("ws://127.0.0.1:9944", selendraTypes);
    let [chain, nodeName, nodeVersion] = await api.chainInfo();
    console.log(`You are connected to chain ${chain} using ${nodeName} v${nodeVersion}`);
    process.exit(1)
}

async function getDefault() { 
    let api = await new DefaultSelendraApi();
    let [chain, nodeName, nodeVersion] = await api.chainInfo();
    console.log(
        `You are connected to chain ${chain} using ${nodeName} v${nodeVersion}`);
    process.exit(1)
}

async function checkBalance() { 
    let api = new SelendraApi("ws://127.0.0.1:9944", selendraTypes);
    let balance = await api.checkBalance("sets4Y16oxoHvAZeNkiefNiyWJrdAYqGqaCjduRCV1Xs9N9sX7");
    console.log(`Your balance ${balance}`);
    process.exit(1)
}

async function transferBlance() { 
    let api = new SelendraApi("ws://127.0.0.1:9944", selendraTypes);
    let mnemonic = "cover october pool token actress empty violin unusual cannon agent fortune pulse";
    let wallet = await new DefaultSelendraWallet(mnemonic).substrateWallet();
    let txhash = await api.transferBalance(wallet, "sets4Y16oxoHvAZeNkiefNiyWJrdAYqGqaCjduRCV1Xs9N9sX", 5);
    console.log(`transaction hash ${txhash}`);
    process.exit(1)
}

async function bindAccount() { 
    let api = new SelendraApi("ws://127.0.0.1:9944", selendraTypes);
    let mnemonic = "cover october pool token actress empty violin unusual cannon agent fortune pulse";
    let status = await api.bindDefaultAccount(mnemonic); 
    console.log(`bind sucess: ${status}`);
}

bindAccount()