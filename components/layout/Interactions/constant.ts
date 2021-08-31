import BanklessPrizePoolProxyRinkeby from '@upsidecomp/upsidecomp-contracts-bankless-core/deployments/rinkeby/BanklessPrizePoolProxyFactory.json'

import RNGBlockhashRinkeby from '@pooltogether/pooltogether-rng-contracts/deployments/rinkeby/RNGBlockhash.json'
import RNGChainlinkRinkeby from '@pooltogether/pooltogether-rng-contracts/deployments/rinkeby/RNGChainlink.json'

export const POOL_ALIASES = {
  'bankless-test': {
    alias: 'bankless-test',
    chainId: 4,
    networkName: 'rinkeby',
    poolAddress: '0x3fF78cA9Fbaff46C121F5AB40a3F302f26be964D'
  },
}

export const CONTRACT_ADDRESSES = {
  4: {
    BANKLESS_PRIZE_POOL_PROXY: BanklessPrizePoolProxyRinkeby.address,
    RNG_SERVICE: {
      blockhash: RNGBlockhashRinkeby.address,
      chainlink: RNGChainlinkRinkeby.address
    }
  }
}

export const PRIZE_POOL_TYPE = Object.freeze({
  compound: 'compound',
  stake: 'stake',
  yield: 'yield'
})

export const CONTRACTS = Object.freeze({
  bankless: 'BanklessPrizePool',
  compound: 'CompoundPrizePool',
  stake: 'StakePrizePool',
  yield: 'YieldPrizePool',
  singleRandomWinner: 'SingleRandomWinner',
  multipleWinners: 'MultipleWinners'
})

export const SUPPORTED_NETWORKS = [1, 4]
