const ethers = require('ethers');

// Provider
const providerRPC = {
   development: {
      name: 'selendra-testnet',
      rpc: 'http://127.0.0.1:9933',
      chainId: 222,
   }
};
const provider = new ethers.providers.StaticJsonRpcProvider(
   providerRPC.development.rpc,
   {
      chainId: providerRPC.development.chainId,
      name: providerRPC.development.name,
   }
);

// Variables
const account_from = {
   privateKey: '26bf5fd4d3d1fd6adf167a4ab112103b61c1b05d6d6ba12828cef938aaac2a23',
};
const addressTo = '0x5b3F084Dd296DBda4a655E83Fc84d39C2b5a5C09';

// Create Wallet
let wallet = new ethers.Wallet(account_from.privateKey, provider);

/*
   -- Create and Deploy Transaction --
*/
const send = async () => {
   console.log(
      `Attempting to send transaction from ${wallet.address} to ${addressTo}`
   );

   // Create Tx Object
   const tx = {
      to: addressTo,
      value: ethers.utils.parseEther('1'),
   };

   // Sign and Send Tx - Wait for Receipt
   const createReceipt = await wallet.sendTransaction(tx);
   await createReceipt.wait();
   console.log(`Transaction successful with hash: ${createReceipt.hash}`);
};

send();