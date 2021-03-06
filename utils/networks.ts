import { getChain } from '@pooltogether/evm-chains-extended'

export const NETWORK = Object.freeze({
  mainnet: 1,
  homestead: 1,
  ropsten: 3,
  rinkeby: 4,
  goerli: 5,
  kovan: 42,
  bsc: 56,
  'poa-sokol': 77,
  'bsc-testnet': 97,
  poa: 99,
  xdai: 100,
  matic: 137,
  polygon: 137,
  local: 31337,
  mumbai: 80001,
})

export const getChainIdByAlias = (networkAlias: string) => {
  return NETWORK[networkAlias]
}

export const getNetworkNameAliasByChainId = (chainId: number) => {
  const networkKeys = Object.keys(NETWORK)
  const networkAlias = networkKeys.find((networkKey: string) => NETWORK[networkKey] === chainId)

  if (typeof networkAlias === 'undefined') {
    return null
  }

  return networkAlias
}

export const networkColorClassname = (networkId: number) => {
  if (networkId === 4) {
    return 'text-yellow-1'
  } else if (networkId === 3) {
    return 'text-red-1'
  } else if (networkId === 5) {
    return 'text-blue'
  } else if (networkId === 1234) {
    return 'text-teal'
  } else if (networkId === 42) {
    return 'text-default-soft'
  } else {
    return 'text-white'
  }
}

export const formatBlockExplorerTxUrl = (tx: string, networkId: number) => {
  try {
    const blockExplorerUrl = getChain(networkId).blockExplorerUrls[0]
    return `${blockExplorerUrl}/tx/${tx}`
  } catch (e) {
    console.warn(`formatBlockExplorerTxUrl: No block explorer for Chain: ${networkId} Chain ID not supported`)
  }
}

export const formatBlockExplorerAddressUrl = (address: string, networkId: number) => {
  try {
    const blockExplorerUrl = getChain(networkId).blockExplorerUrls[0]
    return `${blockExplorerUrl}/address/${address}`
  } catch (e) {
    console.warn(`formatBlockExplorerAddressUrl: No block explorer for Chain: ${networkId} Chain ID not supported`)
  }
}
