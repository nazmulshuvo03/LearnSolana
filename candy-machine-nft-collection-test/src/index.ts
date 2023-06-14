import { initializeKeypair } from "./initializeKeypair"
import * as web3 from "@solana/web3.js"

async function main() {
  const connection = new web3.Connection(web3.clusterApiUrl("devnet"))
  const user = await initializeKeypair(connection)
}

/**
 * 
  
1) sugar launch -> to create config and launch NFT collection. 
  Sample questions are following:

✔ Found 10 file pairs in "assets". Is this how many NFTs you will have in your candy machine? · yes
✔ Found symbol "CRAB" in your metadata file. Is this value correct? · yes
✔ What is the seller fee basis points? · 100
✔ Do you want to use a sequential mint index generation? We recommend you choose no. · no
✔ How many creator wallets do you have? (max limit of 4) · 1
✔ Enter creator wallet address #1 · 9xkh4nEvvxLtLVNU5AQyBGEcbgsXuTg3Xa5mRSZduTJ2
✔ Enter royalty percentage share for creator #1 (e.g., 70). Total shares must add to 100. · 100
✔ Which extra features do you want to use? (use [SPACEBAR] to select options you want and hit [ENTER] when done) ·
✔ What upload method do you want to use? · Bundlr
✔ Do you want your NFTs to remain mutable? We HIGHLY recommend you choose yes. · yes


2) sugar mint -> to mint the tokens.
  Sample Candy Machine URL as following:
  https://www.solaneyes.com/address/Aa7Vjmo7UE2cQTMCkTGmiu5uYjssQdoyhtjzgKW5QRZW?cluster=devnet
  https://www.solaneyes.com/address/6KFWRandCy9zU6Eh6mrrMiPq8mrNSQJJeNykzymk23Cw?cluster=devnet
 *
 **/

main()
  .then(() => {
    console.log("Finished successfully")
    process.exit(0)
  })
  .catch((error) => {
    console.log(error)
    process.exit(1)
  })
