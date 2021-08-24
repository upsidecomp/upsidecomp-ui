import BanklessPrizePoolProxyRinkeby from '@upsidecomp/upsidecomp-contracts-bankless-core/deployments/rinkeby/BanklessPrizePoolProxyFactory.json'

import RNGBlockhashRinkeby from '@pooltogether/pooltogether-rng-contracts/deployments/rinkeby/RNGBlockhash.json'
import RNGChainlinkRinkeby from '@pooltogether/pooltogether-rng-contracts/deployments/rinkeby/RNGChainlink.json'

export const POOL_ALIASES = {
  'bankless-test': {
    alias: 'bankless-test',
    chainId: 4,
    networkName: 'rinkeby',
    poolAddress: '0x106931B87b3c3E6020727C4F23048d809059509e'
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
