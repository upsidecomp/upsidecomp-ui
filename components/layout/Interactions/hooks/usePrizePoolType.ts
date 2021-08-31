import { CONTRACTS, PRIZE_POOL_TYPE } from 'lib/constants'

export const determinePrizePoolType = (contract) => {
switch (contract) {
  case CONTRACTS.compound: {
    return PRIZE_POOL_TYPE.compound
  }
  case CONTRACTS.stake: {
    return PRIZE_POOL_TYPE.stake
  }
  case CONTRACTS.yield: {
    return PRIZE_POOL_TYPE.yield
  }
}
return null
}
