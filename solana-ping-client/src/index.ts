import web3 = require('@solana/web3.js')
import Dotenv from 'dotenv'
Dotenv.config()

const PROGRAM_ADDRESS = 'ChT1B39WKLS8qUrkLvFDXMhEJ4F1XZzwUNHUt4AU9aVa'
const PROGRAM_DATA_ADDRESS = 'Ah9K7dQ8EHaZqcAsgBW8w37yN2eAy3koFmUn4x3CJtod'

async function main() {
  const payer = initializeKeyPair()
  console.log('keypair: ', payer)

  const connection = new web3.Connection(web3.clusterApiUrl('devnet'))
  console.log('connection: ', connection)

  // get SOL by airdrop
  // await connection.requestAirdrop(payer.publicKey, web3.LAMPORTS_PER_SOL * 1)

  const balance = await connection.getBalance(payer.publicKey)
  console.log('current balance: ', balance)

  await pingProgram(connection, payer)
}

async function pingProgram(connection: web3.Connection, payer: web3.Keypair) {
  // create a transaction
  const transaction = new web3.Transaction()

  const programId = new web3.PublicKey(PROGRAM_ADDRESS)
  const programDataPubkey = new web3.PublicKey(PROGRAM_DATA_ADDRESS)

  console.log(
    'transaction, program id and program data key: ',
    transaction,
    programId,
    programDataPubkey,
  )

  // create an instruction
  const instruction = new web3.TransactionInstruction({
    keys: [
      {
        pubkey: programDataPubkey,
        isSigner: false,
        isWritable: true,
      },
    ],
    programId,
  })
  console.log('instruction: ', instruction)

  // add the instruction to the transaction
  transaction.add(instruction)
  console.log('transaction after adding instruction: ', transaction)

  // send the transaction
  const sig = await web3.sendAndConfirmTransaction(connection, transaction, [
    payer,
  ])
  console.log('signature: ', sig)
}

function initializeKeyPair(): web3.Keypair {
  // parse the PRIVATE_KEY from env as number[]
  const secret = JSON.parse(process.env.PRIVATE_KEY ?? '') as number[]
  console.log('secret: ', secret)

  // use it to initialize a Uint8Array
  const secretKey = Uint8Array.from(secret)
  console.log('secret key: ', secretKey)

  // initialize and return a Keypair using that Uint8Array
  const keypairFromSecretKey = web3.Keypair.fromSecretKey(secretKey)
  console.log('key pair from secret key', keypairFromSecretKey)

  return keypairFromSecretKey
}

main()
  .then(() => {
    console.log('Program finished successfully')
  })
  .catch((error) => {
    console.error('There was an error: ', error)
  })

// Signature received: 29nTBXakbMLXuHoBiJgG8jD4Qt3JTTYbujNrztZxuxPMELgBd7KsD1Cj26hcYRqzeQpdsBghhn7UHNk4fTdnsZTC
