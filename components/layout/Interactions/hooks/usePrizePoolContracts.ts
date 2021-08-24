import { ethers } from 'ethers'

import { POOL_ALIASES } from "../constant.ts"

export const usePrizePoolContracts = () => {
  return {
    prizePool: POOL_ALIASES["bankless-test"].poolAddress,
    token: {
      address: "0xd12DAcb1495DE319f5667C218345DCbE54021233",
      symbol: "BANK",
      decimals: 18
    },
    ticket: {
      address : "",
      symbol: "upBANK",
      decimals: 18
    }
  }
}
