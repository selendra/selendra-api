const { 
  CreateAccount,
  ImportAccount,
  TransferBalance,
  TransferBatch,
  GetBalance
} = require('./services/account');

const {
  Approve,
  Transfer,
  TransferFrom,
  Allowance,
  BalanceOf,
  TotalSupply
} = require('./services/contract');

module.exports = {
  CreateAccount,
  GetBalance,
  ImportAccount,
  TransferBalance,
  TransferBatch,
  Approve,
  Transfer,
  TransferFrom,
  Allowance,
  BalanceOf,
  TotalSupply
}