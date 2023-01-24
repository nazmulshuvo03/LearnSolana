import web3 = require('@solana/web3.js')
import Dotenv from 'dotenv'
Dotenv.config()

async function main() {
  const payer = initializeKeyPair()
  const connection = new web3.Connection(web3.clusterApiUrl('devnet'))

  const balance = await connection.getBalance(payer.publicKey)
  console.log('balance', balance)
  console.log('Lamberts per sol', web3.LAMPORTS_PER_SOL)

  await sendSol(
    connection,
    web3.LAMPORTS_PER_SOL * 0.0001,
    web3.Keypair.generate().publicKey,
    payer,
  )
}

function initializeKeyPair(): web3.Keypair {
  const secret = JSON.parse(process.env.PRIVATE_KEY ?? '') as number[]
  const secretKey = Uint8Array.from(secret)
  const keypairFromSecretKey = web3.Keypair.fromSecretKey(secretKey)
  return keypairFromSecretKey
}

async function sendSol(
  connection: web3.Connection,
  amount: number,
  to: web3.PublicKey,
  from: web3.Keypair,
) {
  console.log('amount to transfer: ', amount)

  const transaction = new web3.Transaction()
  const sendSolInstruction = web3.SystemProgram.transfer({
    fromPubkey: from.publicKey,
    toPubkey: to,
    lamports: amount,
  })
  transaction.add(sendSolInstruction)
  const sig = await web3.sendAndConfirmTransaction(connection, transaction, [
    from,
  ])
  console.log('signature: ', sig)
}

main()
  .then(() => console.log('Transfer completed'))
  .catch((err) => console.error('There was an error: ', err))

// signature: 66rQvZBfWnFQNo3RTPLix9SXQCPZHJkZVUJHZ16y1WDj8BC1s53fmuxcYCSxJ8GHmtSqa129kLiraYaX5M47jTxN
