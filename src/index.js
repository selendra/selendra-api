const { 
  CreateAccount,
  ImportAccount,
  TransferBalance,
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
  Approve,
  Transfer,
  TransferFrom,
  Allowance,
  BalanceOf,
  TotalSupply
}