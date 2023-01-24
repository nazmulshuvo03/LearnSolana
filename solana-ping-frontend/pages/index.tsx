import { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import WalletContextProvider from '../components/WalletContextProvider'
import { AppBar } from '../components/AppBar'
import { PingButton } from '../components/PingButton'
import { Balance } from '../components/Balance'
import Head from 'next/head'
import { SendSol } from '../components/SendSol'

const Home: NextPage = (props) => {
  return (
    <div className={styles.App}>
      <Head>
        <title>Wallet-Adapter Example</title>
        <meta name="description" content="Wallet-Adapter Example" />
      </Head>
      <WalletContextProvider>
        <AppBar />
        <div className={styles.AppBody}>
          <PingButton />
        </div>
        <div className={styles.AppBody}>
          <Balance />
          <div className={styles.AppBody}>
            <SendSol />
          </div>
        </div>
      </WalletContextProvider>
    </div>
  )
}

export default Home
