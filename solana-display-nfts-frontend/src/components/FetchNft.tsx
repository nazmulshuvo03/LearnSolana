import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Metaplex, walletAdapterIdentity } from "@metaplex-foundation/js";
import { FC, useEffect, useState } from "react";
import styles from "../styles/custom.module.css";

export const FetchNft: FC = () => {
  const [nftData, setNftData] = useState(null);

  const { connection } = useConnection();
  const wallet = useWallet();
  const metaplex = Metaplex.make(connection).use(walletAdapterIdentity(wallet));

  const fetchNfts = async () => {
    if (!wallet.connected) {
      return;
    }

    // fetch NFTs for connected wallet
    const nfts = await metaplex
      .nfts()
      .findAllByOwner({ owner: wallet.publicKey });

    // fetch off chain metadata for each NFT
    let nftData = [];
    for (let i = 0; i < nfts.length; i++) {
      let fetchResult = await fetch(nfts[i].uri);
      let json = await fetchResult.json();
      nftData.push(json);
    }

    // set state
    setNftData(nftData);
  };

  useEffect(() => {
    fetchNfts();
  }, [wallet]);

  console.log("@@@@@@@@", nftData);

  return (
    <div>
      {nftData && (
        <div
          className={styles.gridNFT}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {nftData.map((nft, i) => (
            <div
              key={i}
              style={{
                width: "320px",
                padding: "10px 30px",
              }}
            >
              <ul>{nft.name}</ul>
              <img
                src={nft.image}
                style={{
                  width: "300px",
                  height: "300px",
                }}
              />
              <div>{nft.description}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
