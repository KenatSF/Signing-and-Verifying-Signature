import Head from "next/head";
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from "react";
import styles from '../styles/Home.module.css';


import Web3 from 'web3';
import Web3Modal from 'web3modal'
import detectEthereumProvider from '@metamask/detect-provider';


export default function Sign() {
    const [myWeb3Modal, setMyWeb3Modal] = useState(null);
    const [formInput, updateFormInput] = useState({ address: '', amount: '', message: '', nonce: '' });
    //var web3;

    useEffect(() => {
        checking_connection();
    }, [myWeb3Modal]);

    async function checkingAddress(input_address) {
        if (!input_address || input_address.length != 42 || input_address.substring(0, 2) != '0x') {
            return "0x";
        } else {
            return input_address;
        }
    }
    async function checkingMessage(input_message) {
        if (!input_message) {
            return "0x";
        } else {
            return input_message;
        }
    }

    async function checkingNumbers(input_numbers) {
        if (!input_numbers || input_numbers <= 0) {
            return 0;
        } else {
            return input_numbers;
        }
    }

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
    }


    async function checkingButton(){
        const web3 = new Web3(myWeb3Modal);
        //const accounts = await web3.eth.getAccounts();
        //console.log(accounts[0]);
        const answer = web3.eth.defaultAccount;
        console.log(answer);
    }

    if (!myWeb3Modal) return (
        <React.Fragment>
            <div className="flex justify-center">
                <div className="w-1/2 flex flex-col pb-12">
                    <button onClick={checking_connection}
                        className="font-bold mt-4 bg-pink-500 text-white rounded p-4 shadow-lg"
                    >Connect</button>
                </div>
            </div>
            <footer className={styles.footer}>
                <h1 className={styles.title}>
                    Powered by KENAT
                </h1>

            </footer>
        </React.Fragment>
    )

    return (

        <React.Fragment>
            <div className="flex justify-center">
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
                        className="font-bold mt-4 bg-pink-500 text-white rounded p-4 shadow-lg"
                    >Confirm Format</button>
                </div>
            </div>
            <div className="flex justify-center">
                <div className="w-1/2 flex flex-col pb-12">
                    <button onClick={checkingButton}
                        className="font-bold mt-4 bg-pink-500 text-white rounded p-4 shadow-lg"
                    >Check data</button>
                </div>
            </div>
            <footer className={styles.footer}>
                <h1 className={styles.title}>
                    Powered by KENAT
                </h1>

            </footer>
        </React.Fragment>
    )



}