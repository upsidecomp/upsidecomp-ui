import { getChain } from '@pooltogether/evm-chains-extended'

export const NETWORK: any = Object.freeze({
  mainnet: 1,
  rinkeby: 4,
})

export const getChainIdByAlias = (networkAlias: any) => {
  return NETWORK[networkAlias]
}

export const getNetworkNameAliasByChainId = (chainId: any) => {
  const networkKeys = Object.keys(NETWORK)
  const networkAlias = networkKeys.find((networkKey: string) => NETWORK[networkKey] === chainId)

  if (typeof networkAlias === 'undefined') {
    return null
  }

  return networkAlias
}

export const networkColorClassname = (networkId: any) => {
  if (networkId === 4) {
    return 'text-yellow-1'
  } else {
    return 'text-white'
  }
}
