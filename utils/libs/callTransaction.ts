import { ethers } from 'ethers'

import { toast } from '../hooks/useToast'
import { parseNumString } from 'utils/libs/parseNumString'

const GAS_MULTIPLIER = 1.15

// this could be smart enough to know which ABI to use based on
// the contract address
export const callTransaction = async (
  setTx: any,
  provider: ethers.providers.Web3Provider,
  usersAddress: string,
  contractAddress: string,
  contractAbi: any,
  method: string,
  txName: string,
  params = [],
) => {
  let ethersTx: any

  setTx({
    inWallet: true,
  })

  const signer = provider.getSigner()

  const contract = new ethers.Contract(contractAddress, contractAbi, signer)

  const nextNonce = await provider.getTransactionCount(usersAddress, 'pending')

  const fxn = Object.values(contract.interface.functions).find(fn => fn.name === method)

  let gasLimit
  const lastParam = params[params.length - 1]
  const includesGasLimitParam =
    // @ts-ignore
    typeof lastParam === 'object' && lastParam.hasOwnProperty('gasLimit')
  if (includesGasLimitParam) {
    // @ts-ignore
    gasLimit = params.pop().gasLimit
  }

  let data = ''
  typeof fxn !== 'undefined' && (data = contract.interface.encodeFunctionData(fxn, params))
  const value = parseNumString('0', 18)

  const chainId = provider.network.chainId

  const transactionRequest = {
    to: contractAddress,
    nonce: nextNonce,
    data: data,
    chainId: chainId,
    value: value,
  }

  let gasEstimate
  try {
    gasEstimate = await contract.estimateGas[method](...params)
  } catch (e) {
    console.warn(`error while estimating gas: `, e)
  }

  if (includesGasLimitParam) {
    transactionRequest["gasLimit"] = gasLimit
  } else if (gasEstimate) {
    transactionRequest["gasLimit"] = parseNumString(Math.round(gasEstimate.toNumber() * GAS_MULTIPLIER).toString(), 'wei')
  }

  try {
    // using the lower level `Signer#sendTransaction` API here
    // since the basic 'contract.method()' (ie.
    // const ethersTx = await contract[method].apply(null, params))
    // one was intermittently
    // failing to get the nonce on Kovan w/ MetaMask
    ethersTx = await signer.sendTransaction(transactionRequest)

    setTx((tx: any) => ({
      ...tx,
      hash: ethersTx.hash,
      inWallet: false,
      sent: true,
    }))

    await ethersTx.wait()

    setTx((tx: any) => ({
      ...tx,
      completed: true,
    }))

    toast.success(`"${txName}" transaction successful!`)
  } catch (e) {
    console.error(e)

    if (e?.message?.match('User denied transaction signature')) {
      setTx((tx: any) => ({
        ...tx,
        // TODO: should be false, false, true. Need to add 'cancelled' states throughout the app.
        completed: true,
        error: true,
        cancelled: true,
      }))

      toast.warn('Transaction cancelled')
      // You cancelled the transaction
    } else {
      setTx((tx: any) => ({
        ...tx,
        completed: true,
        error: true,
      }))

      toast.error(`Error with "${txName}" - See JS Console for details`)
      console.error(e.message)
    }
  }
}
