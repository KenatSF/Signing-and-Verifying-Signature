import Head from "next/head";
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router'
import React from "react";
import styles from '../styles/Home.module.css'

export default function Greetings() {
    const [my_boolean, setMy_Boolean] = useState(false);
    const router = useRouter();

    async function changeMyState() {
        setMy_Boolean(true);
    }

    async function salir() {
        router.push('/');
    }


    if (my_boolean === false) {
        return (
            <React.Fragment>
                <main className={styles.main}>
                    <div className={styles.grid}>
                        <a className={styles.card}>
                            <h2>Left cell</h2>
                            <p>Hello world from left!</p>
                        </a>

                        <a className={styles.card}>
                            <h2>Right cell</h2>
                            <p>Hellow world from right!</p>
                        </a>
                    </div>

                    <div>
                        <button onClick={() => changeMyState()}>
                            Change
                        </button>
                    </div>
                </main>





                <footer className={styles.footer}>
                    <h1 className={styles.title}>
                        Powered by KENAT
                    </h1>

                </footer>
            </React.Fragment>
        )
    }

    return (
        <React.Fragment>
            <main className={styles.main}>
                <div className={styles.grid}>
                    <a className={styles.card}>
                        <h2>Left cell</h2>
                        <p>Hello world from left!</p>
                    </a>

                    <a className={styles.card}>
                        <button onClick={() => salir()}>
                            Exit
                        </button>
                    </a>
                </div>
            </main>




            <footer className={styles.footer}>
                <h1 className={styles.title}>
                    Powered by KENAT
                </h1>

            </footer>
        </React.Fragment>

    )
}