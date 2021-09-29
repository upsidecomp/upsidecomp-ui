import RNGBlockhashRinkeby from '@pooltogether/pooltogether-rng-contracts/deployments/rinkeby/RNGBlockhash.json'
import RNGChainlinkRinkeby from '@pooltogether/pooltogether-rng-contracts/deployments/rinkeby/RNGChainlink.json'
import BanklessPrizePoolProxyRinkeby from '@upsidecomp/upsidecomp-contracts-bankless-core/deployments/rinkeby/BanklessPrizePoolProxyFactory.json'

export const POOL_ALIASES = {
  'bankless-test': {
    alias: 'bankless-test',
    chainId: 4,
    networkName: 'rinkeby',
    poolAddress: '0x29c4B18a595E5e78C7Bcd2aDcCE881F677FF2Ab7',
    prizeStrategyAddress: '0x4C0216192e671e2E767236045067E48762Ec6c96',
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
  upBank: '0xc3D09C8BF66f6831c3bfDBC9fe4BD11015Ecf800',
}
