module.exports = { 
  CreateAccount,
  ImportAccount,
  Transfer,
} = require('./services/account');

module.exports = {
  BalanceOf,
  TotalSupply,
  Allowance,
  Approve,
  Transfer,
  TransferFrom
} = require('./services/contract');