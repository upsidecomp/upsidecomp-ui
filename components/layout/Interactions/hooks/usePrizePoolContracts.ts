import { ethers } from 'ethers'

import { POOL_ALIASES } from "../constant.ts"

export const usePrizePoolContracts = () => {
  return {
    prizePool: POOL_ALIASES["bankless-test"].poolAddress,
    token: {
      address: "0x1cf12dbe0d132eeddac7ce9a0008e0e3362656cf",
      symbol: "BANK",
      decimals: 18
    },
    ticket: {
      address : "0x722EfEce1F1FE2de0A2aD0Accbb4AD20390Fe09a",
      symbol: "upBANK",
      decimals: 18
    },
    sponsorship: {
      address : "0x0f930dAFde1F66B6A5a31a76469fa3e348Cf14D8",
      symbol: "upsBANK",
      decimals: 18
    }
  }
}
