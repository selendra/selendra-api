const { CreateAccount, ImportAccount, Transfer } = require('indra-js');

Transfer({ 
  receiverAddress: '5DM3W28EeKBmZnikwoQNJg9ex5PFdJARNgtkkgTMiu5oi2hG', 
  seed: 'bike shrimp click pretty erosion gaze rather rotate neither script drive resemble', 
  amount: '10'
}).then(res => {
  console.log(res.hash);
})
