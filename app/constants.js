const selendraTypes = require('../types/selendraType');

const ContractABIs = {
    Bridge: require("../types/Bridge.json"),
}
module.exports.ContractABIs = ContractABIs

module.exports.BRIDGEID = 1
module.exports.EVM_CHAINID = 97;
module.exports.EVM_URL = "https://data-seed-prebsc-1-s1.binance.org:8545/";
module.exports.BRIDGECONTRACT = "0x141F168C2D104CF1cfeD686CD084F91b9F02C607" 
module.exports.RESOURDID = "0x000000000000000000000040D2C351B01D6ca809D5B2001D51c920c344e57561"

module.exports.ETHCHAINID = 222;
module.exports.ETHURL = "http://127.0.0.1:9933";

module.exports.SS58FORMAT = 42;
module.exports.SUBURL = "ws://127.0.0.1:9944";
module.exports.TYPES = selendraTypes;