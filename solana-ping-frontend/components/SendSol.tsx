import { FC, useState } from 'react'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import * as web3 from '@solana/web3.js'
import styles from '../styles/SendSol.module.css'

export const SendSol: FC = () => {
  const { connection } = useConnection()
  const { publicKey, sendTransaction } = useWallet()
  const [signature, setSignature] = useState('sfsdfsdf')

  function handleSend(e) {
    e.preventDefault()

    const transaction = new web3.Transaction()

    const sendSolInstruction = web3.SystemProgram.transfer({
      fromPubkey: publicKey,
      toPubkey: new web3.PublicKey(e.target.receiver.value),
      lamports: e.target.amount.value,
    })

    transaction.add(sendSolInstruction)
    sendTransaction(transaction, connection)
      .then((sig) => {
        setSignature(sig)
        console.log('signature: ', sig)
      })
      .catch((err) => console.log('error: ', err))
  }

  return (
    <form onSubmit={handleSend} className={styles.sendSolForm}>
      <div>Amount (in SOL) to send</div>
      <input
        className={styles.inputField}
        type={'text'}
        placeholder={'Amount'}
        id={'amount'}
        required
      />
      <div>Send SOL to</div>
      <input
        className={styles.inputField}
        type={'text'}
        placeholder={'Receiver address'}
        id={'receiver'}
        required
      />
      <div className={styles.actionArea}>
        <button type={'submit'} className={styles.action}>
          Send
        </button>
      </div>
      {signature ? (
        <div>
          <p>View your signature on: </p>
          <a
            href={`https://explorer.solana.com/tx/${signature}?cluster=devnet`}
          >
            Solana Explorer
          </a>
        </div>
      ) : (
        <div />
      )}
    </form>
  )
}
