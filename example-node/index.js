const { CreateAccount, GetBalance, TransferBalance } = require('indra-js');

// TransferBalance({ 
//   receiverAddress: '1gkaceqUJ548ZhuSbzS9uzxcNbLJDHkhmyA2uVvrbaMgA5C', 
//   seed: '', 
//   amount: '10'
// }).then(res => {
//   console.log(res.hash);
// })

// CreateAccount({
//   type: 'sr25519'
// }).then(res => console.log(res.mnemonic, res.pair))

GetBalance({
  address: '14gV68QsGAEUGkcuV5JA1hx2ZFTuKJthMFfnkDyLMZyn8nnb'
}).then(res => console.log(res.balances))