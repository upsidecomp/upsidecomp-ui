import { ethers } from 'ethers'

export const useProvider = () => {
  return new ethers.providers.InfuraProvider('rinkeby', process.env.NEXT_JS_INFURA_ID)
}
