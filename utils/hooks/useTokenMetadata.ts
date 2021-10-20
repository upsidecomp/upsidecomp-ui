import * as React from 'react'
import { ethers } from 'ethers'
import { useProvider } from 'utils/hooks/useProvider'
import ERC721MintableAbi from '@upsidecomp/upsidecomp-contracts-bankless-core/abis/ERC721Mintable.json'
import { usePrizeStrategyContracts } from 'utils/hooks/usePrizeStrategyContracts'
import { QUERY_KEYS } from 'utils/constant'
import { useQuery } from 'react-query'

export const useTokenMetadata = () => {
  return useQuery(QUERY_KEYS.fetchTokenMetadata, async () => fetchTokenMetadata())
}

const fetchTokenMetadata = async () => {

}
