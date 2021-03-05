module.exports = { 
  CreateAccount,
  ImportAccount,
  TransferBalance,
} = require('./services/account');

module.exports = {
  BalanceOf,
  TotalSupply,
  Allowance,
  Approve,
  Transfer,
  TransferFrom
} = require('./services/contract');