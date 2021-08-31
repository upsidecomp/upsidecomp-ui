import { ethers } from 'ethers'
import { batch, contract } from '@pooltogether/etherplex'
import { useQuery } from 'react-query'

import { isValidAddress} from "../libs/utils/address"
import { POOL_ALIASES, NO_REFETCH_QUERY_OPTIONS, QUERY_KEYS  } from "../constant.ts"
import BanklessPrizePoolAbi from '@upsidecomp/upsidecomp-contracts-bankless-core/abis/BanklessPrizePool.json'
import BanklessMultipleWinners from '@upsidecomp/upsidecomp-contracts-bankless-core/abis/BanklessMultipleWinners.json'
import RegistryAbi from '@pooltogether/pooltogether-contracts/abis/Registry'
import ERC20Upgradeable from '@upsidecomp/upsidecomp-contracts-bankless-core/abis/ERC20Upgradeable.json'
import { useProvider } from "./useProvider";

export const usePrizePoolContracts = () => {
  const provider = useProvider();
  const prizePoolType = "BanklessPrizePool"
  const prizePoolAddress = POOL_ALIASES["bankless-test"].poolAddress;
  const poolAddressIsValid = isValidAddress(prizePoolAddress)
  const enabled = Boolean(prizePoolAddress) && poolAddressIsValid

  return useQuery(
    [QUERY_KEYS.fetchPoolData, prizePoolType, prizePoolAddress],
    async () =>
          await _fetchPrizePoolAndPrizeStrategy(provider, prizePoolAddress),
        // @ts-ignore
        {
          ...NO_REFETCH_QUERY_OPTIONS,
          enabled,
          staleTime: Infinity
        }
    )
}

const _fetchPrizePoolAndPrizeStrategy = async (provider, prizePoolAddress) => {
  let prizePoolAbi = BanklessPrizePoolAbi
  let prizeStrategyAbi = BanklessMultipleWinners

  const prizePoolContract = contract('prizePoolData', BanklessPrizePoolAbi, prizePoolAddress)
  const prizePoolValues = await batch(provider, prizePoolContract.prizeStrategy())
  const prizeStrategyAddres = prizePoolValues.prizePoolData.prizeStrategy[0].toLowerCase()

  // first requests
  const firstRequests = []
  firstRequests.push(prizePoolContract.token())
  const { prizePoolData } = await batch(provider, ...firstRequests)

  // second
  const secondRequests = []
  const prizeStrategyContract = contract(
    'prizeStrategyData',
    prizeStrategyAbi,
    prizeStrategyAddres
  )
  secondRequests.push()
  secondRequests.push(
    prizeStrategyContract
      .tokenListener() // comptroller
      .rng()
      .sponsorship()
      .ticket(),
  )

  const { prizeStrategyData, registry } = await batch(provider, ...secondRequests)

  const addresses = {
    rng: { address: '' },
    sponsorship: { address: '' },
    ticket: { address: '' },
    token: { address: '' },
    tokenListener: { address: '' },
    beforeAwardListener: { address: '' }
  }

  Object.keys(prizeStrategyData).forEach((key) => {
    addresses[key] = { address: prizeStrategyData[key][0].toLowerCase() }
  })
  Object.keys(prizePoolData).forEach((key) => {
    addresses[key] = { address: prizePoolData[key][0].toLowerCase() }
  })

  return {
    prizePool: {
    address: prizePoolAddress,
    contract: prizePoolAbi,
    version: ''
  },
  prizeStrategy: {
    address: prizeStrategyAddres,
    contract: prizeStrategyAbi,
    version: ''
  },
    ...addresses
  }
}
