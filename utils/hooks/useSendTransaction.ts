import { useCallback } from 'react'

// import { useOnboard, useUsersAddress } from '@pooltogether/hooks'
import { callTransaction } from '../libs/callTransaction'
import { toast } from './useToast'

export const useSendTransaction = () => {
  const walletMatchesNetwork = true // hardcoded: should check

  const sendTx = useCallback(
    async (setTx, contractAddress, contractAbi, method, txName, params = [], provider, usersAddress) => {
      if (!walletMatchesNetwork) {
        toast.error('Your current network does not match the network which this pool lives on.')
        return
      }
      callTransaction(setTx, provider, usersAddress, contractAddress, contractAbi, method, txName, params)
    },
    [walletMatchesNetwork],
  )
  return sendTx
}
