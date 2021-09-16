import { CONTRACTS, PRIZE_POOL_TYPE } from '../constant'

export const determinePrizePoolType = (contract: any) => {
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
