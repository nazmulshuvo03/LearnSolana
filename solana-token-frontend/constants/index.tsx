import * as web3 from "@solana/web3.js";

export const connection = new web3.Connection(web3.clusterApiUrl("devnet"));

export const TOKEN_NAME = "Tiger";
export const TOKEN_SYMBOL = "TGR";
export const TOKEN_DESCRIPTION = "This token holders hold power of the tiger";
