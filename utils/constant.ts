import RNGBlockhashRinkeby from '@pooltogether/pooltogether-rng-contracts/deployments/rinkeby/RNGBlockhash.json'
import RNGChainlinkRinkeby from '@pooltogether/pooltogether-rng-contracts/deployments/rinkeby/RNGChainlink.json'
import BanklessPrizePoolProxyRinkeby from '@upsidecomp/upsidecomp-contracts-bankless-core/deployments/rinkeby/BanklessPrizePoolProxyFactory.json'

export const POOL_ALIASES = {
  'bankless-test': {
    alias: 'bankless-test',
    chainId: 4,
    networkName: 'rinkeby',
    poolAddress: process.env.NEXT_PUBLIC_POOL_ADDRESS,
    prizeStrategyAddress: process.env.NEXT_PUBLIC_PRIZE_STRATEGY_ADDRESS,
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
  fetchTokenMetadata: 'fetchTokenMetadata'
}

export const ERC20_CONTRACTS = {
  bank: process.env.NEXT_PUBLIC_BANK_CONTRACT_ADDRESS,
  upBank: process.env.NEXT_PUBLIC_UPBANK_CONTRACT_ADDRESS,
}

export const ALLOWED_NETWORK = process.env.NEXT_PUBLIC_ALLOWED_NETWORK
  ? process.env.NEXT_PUBLIC_ALLOWED_NETWORK.split(',')
  : []

export const NETWORK_NAME = {
  3: 'Ropsten',
  4: 'Rinkeby',
  5: 'Goerly',
}
