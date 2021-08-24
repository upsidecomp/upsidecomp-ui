import BanklessPrizePoolProxyRinkeby from '@upsidecomp/upsidecomp-contracts-bankless-core/deployments/rinkeby/BanklessPrizePoolProxyFactory.json'

import RNGBlockhashRinkeby from '@pooltogether/pooltogether-rng-contracts/deployments/rinkeby/RNGBlockhash.json'
import RNGChainlinkRinkeby from '@pooltogether/pooltogether-rng-contracts/deployments/rinkeby/RNGChainlink.json'

export const POOL_ALIASES = {
  'bankless-test': {
    alias: 'bankless-test',
    chainId: 4,
    networkName: 'rinkeby',
    poolAddress: '0x02733EB54EA56bcca58eaF9D962C3773cbF9B466'
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
