const selendraTypes = require('../types/selendraType');
const API = require("@polkadot/api")

class SelendraApi {
    constructor(wsProvider, type) {
        this.wsProvider = wsProvider;
        this.type = type;
    }

    async connect() {
        const wsProvider = new API.WsProvider(this.wsProvider);
        const api = await API.ApiPromise.create({
            provider: wsProvider,
            types: this.type
        });
		return api;
	}

    async chainInfo() {
        const api = await this.connect();
        const [chain, nodeName, nodeVersion, chainDecimals] = await Promise.all([
            api.rpc.system.chain(),
            api.rpc.system.name(),
            api.rpc.system.version(),
            api.registry.chainDecimals
        ]);
        return [chain, nodeName, nodeVersion, chainDecimals];
    }
}

class DefaultApi extends SelendraApi {
    constructor() {
        super("ws://127.0.0.1:9944", selendraTypes)
    }

    async connect() {
        const wsProvider = new API.WsProvider(this.wsProvider);
        const api = await API.ApiPromise.create({
            provider: wsProvider,
            types: this.type
        });
		return api;
	}
}


module.exports.SelendraApi = SelendraApi;
module.exports.DefaultApi = DefaultApi;
