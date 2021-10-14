import { ethers } from 'ethers'

// TODO: change the default value to be homestead once we have launch in mainnet
export const useProvider = (networkName = 'rinkeby') => {
  return new ethers.providers.InfuraProvider(networkName, process.env.NEXT_JS_INFURA_ID)
}
