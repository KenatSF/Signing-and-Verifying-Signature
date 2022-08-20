const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

const Verify = artifacts.require("VerifySignature");

contract("Verify Signature", () => {
    let verify;

  beforeEach(async () => {
    const accounts = await web3.eth.getAccounts();
    verify = await Verify.new({from: accounts[9]});
    
  });

  it("Sign message", async () => {
    const accounts = await web3.eth.getAccounts();

    var _address = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
    var _amount = 666;
    var _message = "Hellow World!";
    var _nonce = 1

    // Just in case: Remember, get the hash of the message first
    //                Sign the hash with your account either with web3.js or ethers.js
    //                Finally, recover the signer with ecrecover() inside the contract making use of Solidity.

    console.log('-------------------------------------------------------------------------------');
    console.log("Getting message Hash from contract.")
    const hash = await verify.getMessageHash(_address, _amount, _message, _nonce, {from: accounts[0]});
    console.log(hash);
    console.log(`Type of: ${typeof(hash)}`);
    console.log(" ");

    console.log('-------------------------------------------------------------------------------');
    console.log("Getting message Hash from web3.")
    const hash1 = await web3.utils.soliditySha3(_address, _amount, _message, _nonce);
    console.log(hash1);
    console.log(`Type of: ${typeof(hash1)}`);
    console.log(" ");
    
    


    console.log('-------------------------------------------------------------------------------');   // This method works inside de App but here, It does not
    console.log("Signing message Hash with.")
    const msgHash = web3.eth.accounts.hashMessage(hash);
    const signed_hash0 = await web3.eth.sign(msgHash, accounts[0]);
    console.log(msgHash);
    console.log(signed_hash0);
    console.log(" ");

    console.log('-------------------------------------------------------------------------------');   // The last byte is different from below
    console.log("Signing message Hash without.")
    const signed_hash1 = await web3.eth.sign(hash, accounts[0]);
    console.log(signed_hash1);
    console.log(" ");


    console.log('-------------------------------------------------------------------------------');   // This method requires the private_key
    console.log("Signing message Hash.")
    const signed_hash2 = await web3.eth.accounts.sign(hash, process.env.PRIVATE_KEY_ACCOUNT_0);
    console.log(signed_hash2);
    console.log(signed_hash2.signature);
    console.log(" ");
    


    console.log(" Verify within smart-contract");
    console.log('-------------------------------------------------------------------------------');     
    console.log("Verifying signer!");
    const signer0 = await verify.verifySigner(_address, _amount, _message, _nonce, signed_hash0, {from: accounts[9]});
    console.log(`Signer: ${signer0}`);
    console.log(" ");

    console.log('-------------------------------------------------------------------------------');     
    console.log("Verifying signer!");
    const signer1 = await verify.verifySigner(_address, _amount, _message, _nonce, signed_hash1, {from: accounts[9]});
    console.log(`Signer: ${signer1}`);
    console.log(" ");

    console.log('-------------------------------------------------------------------------------');
    console.log("Verifying signer!");
    const signer2 = await verify.verifySigner(_address, _amount, _message, _nonce, signed_hash2.signature, {from: accounts[9]});
    console.log(`Signer: ${signer2}`);
    console.log(" ");


    console.log(" Verify within javascript");
    console.log('-------------------------------------------------------------------------------');   
    console.log("Verifying signer!");
    const a =  web3.eth.accounts.recover(hash, signed_hash0, {from: accounts[9]});
    console.log(`Signer: ${a}`);
    console.log(" ");

    console.log('-------------------------------------------------------------------------------');   // Same answer that const d
    console.log("Verifying signer!");
    const b =  web3.eth.accounts.recover(hash, signed_hash1, {from: accounts[9]});
    console.log(`Signer: ${b}`);
    console.log(" ");

    console.log('-------------------------------------------------------------------------------');   
    console.log("Verifying signer!");
    const c =  web3.eth.accounts.recover(signed_hash2, {from: accounts[9]});
    console.log(`Signer: ${c}`);
    console.log(" ");

    console.log('-------------------------------------------------------------------------------'); //This method doesn't work eventhough hash and signature are correct
    console.log("Verifying signer!");
    const d =  web3.eth.accounts.recover(hash, signed_hash2.signature, {from: accounts[9]});
    console.log(`Signer: ${d}`);
    console.log(" ");


  
  });


});