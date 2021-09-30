
const { Api } = require("./app/api");

async function substrateTransfer() { 
    let mnemonic = "cover october pool token actress empty violin unusual cannon agent fortune pulse";
    let to = "5HC5kafMxWYjXbE6ynh4RhoaouH9p5MetZ29VCsRFL1MpKt1";

    let api = new Api();
    let account = await api.substrateAccount(mnemonic);
    let hash = await api.subtrateTransfer(account, to, 1);
    console.log(`transaction hash ${hash}`);
}

async function etherTransfer() { 
    let api = new Api();
    let mnemonic = "cover october pool token actress empty violin unusual cannon agent fortune pulse";
    let to = "0xff93B45308FD417dF303D6515aB04D9e89a750Ca";
    let account = api.etherAccount(mnemonic);
    
    let hash = await api.etherTransfer(account.privateKey, to, '1');
    console.log(`transaction hash ${hash}`);
}
  
async function ethercheckBalance() {
    let addr = "0xff93B45308FD417dF303D6515aB04D9e89a750Ca";
    let api = new Api();
    let balance = await api.checkEtherBalance(addr);
    console.log(`Your balance ${balance} SEL`);
}

async function substratecheckBalance() {
    let addr = "5HC5kafMxWYjXbE6ynh4RhoaouH9p5MetZ29VCsRFL1MpKt1";
    let api = new Api();
    let balance = await api.checkSubstrateBalance(addr);
    console.log(`Your balance ${balance} SEL`);
}

async function bindAccount() { 
    let api = new Api();
    let mnemonic = "cover october pool token actress empty violin unusual cannon agent fortune pulse";
    
    let ethaccount = api.etherAccount(mnemonic);
    let subaccount = await api.substrateAccount(mnemonic);
    
    let hash = await api.bindAccount(subaccount, ethaccount);
    console.log(`${hash}`);
}

// bindAccount()
// substratecheckBalance()
// ethercheckBalance() 
// etherTransfer()
// substrateTransfer()