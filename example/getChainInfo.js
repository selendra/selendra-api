const { DefaultApi, selendraTypes, SelendraApi } = require('../index');

async function get() { 
    let api = await new SelendraApi("ws://127.0.0.1:9944", selendraTypes);
    let [chain, nodeName, nodeVersion, chainDecimals] = await api.chainInfo();
    console.log(`You are connected to chain ${chain} using ${nodeName} v${nodeVersion}`);
    process.exit(1)
}

async function getDefault() { 
    let api = await new DefaultApi();
    let [chain, nodeName, nodeVersion, chainDecimals] = await api.chainInfo();
    console.log(`You are connected to chain ${chain} using ${nodeName} v${nodeVersion}`);
    process.exit(1)
}
