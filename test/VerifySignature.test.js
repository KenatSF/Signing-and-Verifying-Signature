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

    console.log('-------------------------------------------------------------------------------');
    console.log("Getting message Hash.")
    const hash = await verify.getMessageHash(_address, _amount, _message, _nonce, {from: accounts[0]});
    console.log(hash);
    console.log(`Type of: ${typeof(hash)}`);
    console.log(" ");

    console.log('-------------------------------------------------------------------------------');
    console.log("Getting ANOTHER message Hash.")
    const hash1 = await web3.utils.soliditySha3(_address, _amount, _message, _nonce);
    console.log(hash1);
    console.log(`Type of: ${typeof(hash1)}`);
    console.log(" ");

    

    console.log('-------------------------------------------------------------------------------');
    console.log("Signing message Hash.")
    const signed_hash = await web3.eth.sign(hash, accounts[0]);
    console.log(signed_hash);
    console.log(" ");


    console.log('-------------------------------------------------------------------------------');
    console.log("Signing ANOTHER message Hash.")
    const signed_hash1 = await web3.eth.accounts.sign(hash1, process.env.PRIVATE_KEY_ACCOUNT_0);
    console.log(signed_hash1.signature);
    console.log(" ");
    

    console.log('-------------------------------------------------------------------------------');
    console.log("Verifying signer!");
    const signer = await verify.verifySigner(_address, _amount, _message, _nonce, signed_hash1.signature, {from: accounts[9]});
    console.log(`Signer: ${signer}`);
    console.log(" ");

  
  });


});