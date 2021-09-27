import { batch, contract } from '@pooltogether/etherplex'
import BanklessMultipleWinners from '@upsidecomp/upsidecomp-contracts-bankless-core/abis/BanklessMultipleWinners.json'
import BanklessPrizePoolAbi from '@upsidecomp/upsidecomp-contracts-bankless-core/abis/BanklessPrizePool.json'
import { ethers } from 'ethers'
import { useQuery } from 'react-query'
import ERC20Upgradable from '@upsidecomp/upsidecomp-contracts-bankless-core/abis/ERC20Upgradeable.json'
import { ERC20_CONTRACTS, NO_REFETCH_QUERY_OPTIONS, POOL_ALIASES, QUERY_KEYS } from '../constant'
import { isValidAddress } from 'utils/libs/address'
import { useProvider } from './useProvider'

export const usePrizeStrategyContracts = () => {
  const provider = useProvider()
  const prizeStrategyAddress = POOL_ALIASES['bankless-test'].prizeStrategyAddress
  const prizePoolAddress = POOL_ALIASES['bankless-test'].poolAddress
  const prizeStrategyAddressIsValid = isValidAddress(prizeStrategyAddress)
  const enabled = Boolean(prizeStrategyAddress) && prizeStrategyAddressIsValid

  return useQuery(
    [QUERY_KEYS.fetchPrizeStrategyData, prizeStrategyAddress],
    async () => await _fetchPrizeStrategyData(provider, prizeStrategyAddress, prizePoolAddress),
    // @ts-ignore
    {
      ...NO_REFETCH_QUERY_OPTIONS,
      enabled,
      staleTime: Infinity,
    },
  )
}

const _fetchPrizeStrategyData = async (
  provider: ethers.providers.InfuraProvider,
  prizeStrategyAddress: string,
  prizePoolAddress: string,
) => {
  const prizeStrategyAbi = BanklessMultipleWinners

  // first
  const firstRequest = []
  const prizeStrategyContract = contract('prizeStrategyData', prizeStrategyAbi, prizeStrategyAddress)
  firstRequest.push(prizeStrategyContract.prizePeriodEndAt().prizePool())

  const { prizeStrategyData } = await batch(provider, ...firstRequest)

  // second
  const secondRequest = []
  const bankContract = new ethers.Contract(ERC20_CONTRACTS.bank, ERC20Upgradable, provider)
  const balance = await bankContract.balanceOf(prizePoolAddress)

  const data: any = {
    prizePeriodEndAt: new Date(prizeStrategyData['prizePeriodEndAt'][0].toNumber() * 1000),
    totalDeposit: Number(ethers.utils.formatUnits(balance)).toFixed(2),
  }

  return {
    ...data,
  }
}
