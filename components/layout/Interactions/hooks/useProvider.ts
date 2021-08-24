import { ethers } from 'ethers'

export const useProvider = () => {
  if (typeof window.ethereum !== 'undefined') {
    return new ethers.providers.Web3Provider(window.ethereum, "any")
  }

  return new ethers.providers.InfuraProvider('rinkeby', process.env.NEXT_JS_INFURA_ID)
}
