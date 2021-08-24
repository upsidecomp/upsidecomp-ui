import { useCallback } from 'react'
// import { useOnboard, useUsersAddress } from '@pooltogether/hooks'

import { callTransaction } from '../libs/callTransaction'
import { toast } from './useToast'

export const useSendTransaction = (provider, usersAddress) => {
  const walletMatchesNetwork = true // hardcoded: should check

  const sendTx = useCallback(
    async (setTx, contractAddress, contractAbi, method, txName, params = []) => {
      if (!walletMatchesNetwork) {
        toast.error('Your current network does not match the network which this pool lives on.')
        return
      }
      console.log(setTx, contractAddress, contractAbi, method, txName, params)
      callTransaction(
        setTx,
        provider,
        usersAddress,
        contractAddress,
        contractAbi,
        method,
        txName,
        params
      )
    },
    [walletMatchesNetwork]
  )
  return sendTx
}
