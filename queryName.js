const API = require("@polkadot/api");
const selendraTypes = require('./types/selendraType');

async function QueryName() {
    const wsProvider = new API.WsProvider("ws://127.0.0.1:9944");
    const api = await API.ApiPromise.create({
        provider: wsProvider,
        types: selendraTypes
    });

    // The actual address that we will use
    const ADDR = '5EaALb6DDNjBFoBkyTa88HGAiU4PBaEwenUzzj7X6XMpzDUu';

    // Retrieve the last timestamp
    const name = (await api.query.nicks.nameOf(ADDR)).toHuman();

    console.log(`${ADDR}: Have name ${name[0]}`);
}

QueryName()