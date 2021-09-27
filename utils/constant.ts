import RNGBlockhashRinkeby from '@pooltogether/pooltogether-rng-contracts/deployments/rinkeby/RNGBlockhash.json'
import RNGChainlinkRinkeby from '@pooltogether/pooltogether-rng-contracts/deployments/rinkeby/RNGChainlink.json'
import BanklessPrizePoolProxyRinkeby from '@upsidecomp/upsidecomp-contracts-bankless-core/deployments/rinkeby/BanklessPrizePoolProxyFactory.json'

export const POOL_ALIASES = {
  'bankless-test': {
    alias: 'bankless-test',
    chainId: 4,
    networkName: 'rinkeby',
    poolAddress: '0x3fF78cA9Fbaff46C121F5AB40a3F302f26be964D',
    prizeStrategyAddress: '0xa96d11420668f6ebc9b51859e4018662f8c762c3',
  },
}

export const CONTRACT_ADDRESSES = {
  4: {
    BANKLESS_PRIZE_POOL_PROXY: BanklessPrizePoolProxyRinkeby.address,
    RNG_SERVICE: {
      blockhash: RNGBlockhashRinkeby.address,
      chainlink: RNGChainlinkRinkeby.address,
    },
  },
}

export const PRIZE_POOL_TYPE = Object.freeze({
  compound: 'compound',
  stake: 'stake',
  yield: 'yield',
})

export const CONTRACTS = Object.freeze({
  bankless: 'BanklessPrizePool',
  compound: 'CompoundPrizePool',
  stake: 'StakePrizePool',
  yield: 'YieldPrizePool',
  singleRandomWinner: 'SingleRandomWinner',
  multipleWinners: 'MultipleWinners',
})

export const SUPPORTED_NETWORKS = [1, 4]
export const NO_REFETCH_QUERY_OPTIONS = Object.freeze({
  refetchInterval: false,
  refetchOnReconnect: false,
  refetchOnWindowFocus: false,
})

export const QUERY_KEYS = {
  fetchPoolData: 'fetchPoolData',
  fetchPrizeStrategyData: 'fetchPrizeStrategyData',
}

export const ERC20_CONTRACTS = {
  bank: '0x1CF12Dbe0d132EEddAc7ce9a0008e0e3362656cf',
  upBank: '0x0f930dafde1f66b6a5a31a76469fa3e348cf14d8',
}
