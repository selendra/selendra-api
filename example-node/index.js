const { CreateAccount, GetBalance, TransferBalance, TransferBatch } = require('indra-js');

// TransferBalance({ 
//   receiverAddress: '1gkaceqUJ548ZhuSbzS9uzxcNbLJDHkhmyA2uVvrbaMgA5C', 
//   seed: '', 
//   amount: '1'
// }).then(res => {
//   console.log(res.hash);
// })

// CreateAccount({
//   type: 'sr25519'
// }).then(res => console.log(res.mnemonic, res.pair))

// GetBalance({
//   address: '14gV68QsGAEUGkcuV5JA1hx2ZFTuKJthMFfnkDyLMZyn8nnb'
// }).then(res => console.log(res.balances))

const data = [
  { receiverAddress: '131QcH2AmwcCqpE2PSAHXzZA53MVjbpkVuCU8GY7sPcMKxx3', amount: '1' },
  { receiverAddress: '152kiJ8PYN2stR6JbNy41XBxWbibmW5o1MGAQvjPiYDmYdje', amount: '1' },
]

TransferBatch({
  seed: '',
  data
}).then(res => {
  console.log(res.hash);
})