import { FC, useEffect, useState } from 'react'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'

export const Balance: FC = () => {
  const { connection } = useConnection()
  const { publicKey } = useWallet()
  const [balance, setBalance] = useState(null)

  useEffect(() => {
    if (connection && publicKey) {
      connection
        .getBalance(publicKey)
        .then((amount) => {
          console.log('amount', amount)
          setBalance(amount)
        })
        .catch((err) => console.log('error: ', err))
    }
  }, [connection, publicKey])

  return (
    <div>
      <div>{`Balance: ${balance}`}</div>
    </div>
  )
}
