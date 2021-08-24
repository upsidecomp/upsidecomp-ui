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
      address : "0x5fCeFF6113aD16625E32954182F87661Cf8b5b8d",
      symbol: "upBANK",
      decimals: 18
    },
    sponsorship: {
      address : "0xd61dB99A7023Adb9840ca7Ea36FA4B44bA7C90cd",
      symbol: "upsBANK",
      decimals: 18
    }
  }
}
