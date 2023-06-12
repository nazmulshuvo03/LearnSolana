import { FC, useEffect, useState } from "react";
import { VStack } from "@chakra-ui/react";
import { useWallet } from "@solana/wallet-adapter-react";
import {
  Metaplex,
  keypairIdentity,
  bundlrStorage,
} from "@metaplex-foundation/js";
import { Keypair, PublicKey } from "@solana/web3.js";
import * as web3 from "@solana/web3.js";
import {
  connection,
  TOKEN_NAME,
  TOKEN_SYMBOL,
  TOKEN_DESCRIPTION,
} from "../constants";
import {
  createNewMint,
  createTokenAccount,
  mintTokens,
  transferTokens,
  burnTokens,
  createTokenMetadata,
} from "../functions/helpers";
import {
  initializeKeypair,
  airdropSolIfNeeded,
} from "../functions/initializeKeypair";

const Connected: FC = () => {
  const { wallet } = useWallet();
  const [files, setFiles] = useState<any>();
  const [mintAddress, setMintAddress] = useState<any>();
  const [user, setUser] = useState<any>();

  useEffect(() => {
    async function fetchUser() {
      let res = await initializeKeypair();
      setUser(res);
    }
    fetchUser();
  }, []);

  /**
    useEffect(() => {
      async function fetchAirDrop() {
        await airdropSolIfNeeded(user);
      }
      if (user) {
        fetchAirDrop();
      }
    }, [user]);
  
      useEffect(() => {
        async function fetchAirdrop(
          signer: web3.Keypair,
          connection: web3.Connection
        ) {
          const balance = await connection.getBalance(signer.publicKey);
          console.log("Current balance is", balance / web3.LAMPORTS_PER_SOL);
    
          if (balance < web3.LAMPORTS_PER_SOL) {
            console.log("Airdropping 1 SOL...");
            const airdropSignature = await connection.requestAirdrop(
              signer.publicKey,
              web3.LAMPORTS_PER_SOL
            );
            console.log("Airdrop request signature: ", airdropSignature);
    
            const latestBlockHash = await connection.getLatestBlockhash();
    
            const confirm = await connection.confirmTransaction(
              {
                blockhash: latestBlockHash.blockhash,
                lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
                signature: airdropSignature,
              },
              "finalized"
            );
            console.log("Airdrop Transaction confirmation: ", confirm);
    
            const newBalance = await connection.getBalance(signer.publicKey);
            console.log("New balance is", newBalance / web3.LAMPORTS_PER_SOL);
          }
        }
    
        if (user) {
          fetchAirdrop(user, connection);
        }
      }, [user]);
      **/

  console.log("Env Public Key: ", user && user.publicKey.toBase58());
  console.log(
    "Wallet Public key: ",
    wallet && wallet.adapter.publicKey && wallet.adapter.publicKey.toString()
  );

  /**
    useEffect(() => {
      async function fetchAllNfts() {
        const keypair = Keypair.generate();
  
        const metaplex = new Metaplex(connection);
        metaplex.use(keypairIdentity(keypair));
  
        if (wallet && wallet.adapter && wallet.adapter.publicKey) {
          const owner = new PublicKey(wallet.adapter.publicKey.toString());
          const allNFTs = await metaplex.nfts().findAllByOwner({ owner });
  
          console.log("@@@@@@@@@@", wallet, allNFTs);
        }
      }
      fetchAllNfts();
    }, [wallet]);
    **/

  async function mintToken() {
    // Create new mint
    const mint = await createNewMint(
      connection,
      user,
      user.publicKey,
      user.publicKey,
      2
    );
    setMintAddress(mint);

    // Metaplex setup
    const metaplex = Metaplex.make(connection)
      .use(keypairIdentity(user))
      .use(
        bundlrStorage({
          address: "https://devnet.bundlr.network",
          providerUrl: "https://api.devnet.solana.com",
          timeout: 60000,
        })
      );

    // Creating token metadata
    await createTokenMetadata(
      connection,
      metaplex,
      new PublicKey(mint),
      user,
      TOKEN_NAME,
      TOKEN_SYMBOL,
      TOKEN_DESCRIPTION,
      files[0]
    );

    // Create token account
    const tokenAcc = await createTokenAccount(
      connection,
      user,
      mint,
      user.publicKey
    );

    // Mint 100 tokens
    await mintTokens(connection, user, mint, tokenAcc.address, user, 100);
  }

  return (
    <VStack spacing={20}>
      <div>{mintAddress?.toString()}</div>
      <div>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFiles(e.target.files)}
        />
        <button onClick={mintToken}>Mint Token</button>
      </div>
    </VStack>
  );
};

export default Connected;
