import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import React from "react";
import styles from '../styles/Home.module.css';
import { CopyToClipboard } from "react-copy-to-clipboard";

import VerifyABI from '../build/contracts/VerifySignature.json';

import Web3 from 'web3';
import Web3Modal from 'web3modal'
import { checkingAddress, checkingMessage, checkingNumbers, contractAddress } from './utils';


export default function Sign() {
    const [myWeb3Modal, setMyWeb3Modal] = useState(null);
    const [hash, setHash] = useState(null);
    const [signHash, setSignHash] = useState(null);
    const [formInput, updateFormInput] = useState({ address: '', amount: '', message: '', nonce: '' });
    
    const [copied, setCopied] = useState(false);

    const contractAddress = "0xde052Ea17F1Bd1AA8A7C99337a1801744aA8edED";

    useEffect(() => {
        checking_connection();
    }, [myWeb3Modal]);



    async function checking_connection() {
        try {
            const web3Modal = new Web3Modal();
            const connection = await web3Modal.connect();

            if (connection.isConnected()) {
                setMyWeb3Modal(connection);
            }
        } catch (e) {
            console.log("Little connection error!");
        }
    }


    async function confirmFormat() {
        var { address, amount, message, nonce } = formInput;
        address = await checkingAddress(address);
        message = await checkingMessage(message);
        amount = await checkingNumbers(amount);
        nonce = await checkingNumbers(nonce);
        updateFormInput({ address: address, amount: amount, message: message, nonce: nonce });

        const web3 = new Web3(myWeb3Modal);
        const verify = new web3.eth.Contract(VerifyABI.abi, contractAddress);
        const myHash = await verify.methods.getMessageHash(address, amount, message, nonce).call();

        setHash(myHash);
        console.log(address);
        console.log(message);
        console.log(contractAddress);
    }


    async function signingHash() {
        const web3 = new Web3(myWeb3Modal);
        const accounts = await web3.eth.getAccounts();

        const msgHash = web3.eth.accounts.hashMessage(hash)
        const signed_hash = await web3.eth.sign(msgHash, accounts[0]);
        setSignHash(signed_hash);


        // The code line below is almost the same that verify.js file
        const signingAddress = web3.eth.accounts.recover(hash, signed_hash);
        console.log(signingAddress);
    }

    if (!myWeb3Modal) return (
        <React.Fragment>
            <div className={styles.container}>
                <main className={styles.main}>
                    <h4 className={styles.title}>
                        Not connected!
                    </h4>
                    <div className="w-1/2 flex flex-col pb-12">
                        <button onClick={checking_connection}
                            className="font-bold mt-4 bg-sky-900 text-white rounded p-4 shadow-lg"
                        >Connect</button>
                    </div>

                </main>

                <footer className={styles.footer}>
                    <h1 className={styles.title}>
                        Powered by KENAT
                    </h1>

                </footer>
            </div>


        </React.Fragment>
    )



    return (

        <React.Fragment>
            {Boolean(!hash) ?
                <div className={styles.container}>
                    <main className={styles.main}>
                        <h4 className={styles.title}>
                            Connected!
                        </h4>
                        <div className="w-1/2 flex flex-col pb-12">
                            <input
                                placeholder="Address to"
                                className="mt-8 border rounded p-4"
                                onChange={e => updateFormInput({ ...formInput, address: e.target.value })}
                            />
                            <input
                                placeholder="Enter amount"
                                className="mt-8 border rounded p-4"
                                type="number"
                                onChange={e => updateFormInput({ ...formInput, amount: e.target.value })}
                            />
                            <textarea
                                placeholder="Enter message"
                                className="mt-2 border rounded p-4"
                                onChange={e => updateFormInput({ ...formInput, message: e.target.value })}
                            />
                            <input
                                placeholder="Enter nonce"
                                className="mt-8 border rounded p-4"
                                type="number"
                                onChange={e => updateFormInput({ ...formInput, nonce: e.target.value })}
                            />
                            <button onClick={confirmFormat}
                                className="font-bold mt-4 bg-sky-900 text-white rounded p-4 shadow-lg"
                            >Confirm Format</button>
                        </div>
                    </main>
                    <footer className={styles.footer}>
                        <h1 className={styles.title}>
                            Powered by KENAT
                        </h1>

                    </footer>
                </div>

                :

                <div className={styles.container}>
                    <main className={styles.main}>
                        <h4 className={styles.title}>
                            Connected!
                        </h4>
                        <div className={styles.grid}>
                            <div className="mt-8 rounded p-4">
                                <div className="my-4 ...">Hash: </div>
                            </div>
                            <div className="mt-8 border rounded p-4">
                                <div className="my-4 ...">{hash}</div>
                            </div>

                        </div>
                        {Boolean(!signHash) ?
                            <div className="w-1/2 flex flex-col pb-12">
                                <button onClick={signingHash}
                                    className="font-bold mt-4 bg-sky-900 text-white rounded p-4 shadow-lg"
                                >Sign</button>
                            </div>
                            :
                            <div className="grid grid-rows-2 grid-flow-col gap-4">
                                <div className="row-span-3 mt-8 rounded p-4">
                                    <div className="my-4 ...">Signature: </div>
                                </div>
                                <div className="col-span-2 mt-8 border rounded p-4">
                                    <div className="my-4 ...">{signHash}</div>
                                </div>
                                <div className="row-start-1 row-end-4 content-end rounded p-4">
                                    <CopyToClipboard text={signHash}
                                        onCopy={() => setCopied(true)}>
                                        <button
                                            className="font-bold mt-8 bg-sky-900 text-white rounded p-4 shadow-lg"
                                        >Copy</button>
                                    </CopyToClipboard>
                                </div>
                            </div>}

                    </main>
                    <footer className={styles.footer}>
                        <h1 className={styles.title}>
                            Powered by KENAT
                        </h1>
                    </footer>
                </div>

            }
        </React.Fragment>
    )



}