import { useEffect, useState } from 'react';
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome!
        </h1>

        <div className={styles.grid}>
          <a className={styles.card}>
            <Link href="/sign"><h2>Sign Message</h2></Link>
          </a>
          <a className={styles.card}>
            <Link href="/verify"><h2>Verify Signer</h2></Link>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <h1 className={styles.title}>
          Powered by KENAT
        </h1>
        
      </footer>
    </div>
  )
}
