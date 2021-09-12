import { ethers } from 'ethers'

import { toast } from '../hooks/useToast'
import { parseNumString } from "../libs/utils/parseNumString"

const GAS_MULTIPLIER = 1.15

// this could be smart enough to know which ABI to use based on
// the contract address
export const callTransaction = async (
  setTx,
  provider,
  usersAddress,
  contractAddress,
  contractAbi,
  method,
  txName,
  params = []
) => {
  let ethersTx

  setTx({
    inWallet: true
  })

  const signer = provider.getSigner()

  const contract = new ethers.Contract(contractAddress, contractAbi, signer)

  const nextNonce = await provider.getTransactionCount(usersAddress, 'pending')

  const fxn = Object.values(contract.interface.functions).find((fn) => fn.name === method)

  let gasLimit
  const lastParam = params[params.length - 1]
  const includesGasLimitParam =
    typeof lastParam === 'object' && lastParam.hasOwnProperty('gasLimit')
  if (includesGasLimitParam) {
    gasLimit = params.pop().gasLimit
  }

  const data = contract.interface.encodeFunctionData(fxn, params)
  const value = parseNumString('0', 18)

  const chainId = provider.network.chainId
  let transactionRequest: ethers.Transaction = {
    to: contractAddress,
    nonce: nextNonce,
    data: data,
    chainId: chainId,
    value: value
  }


  let gasEstimate: ethers.BigNumber
  try {
    gasEstimate = await contract.estimateGas[method](...params)
    console.log("gasEstimate: ", gasEstimate.toNumber())
  } catch (e) {
    console.warn(`error while estimating gas: `, e)
  }

  if (includesGasLimitParam) {
    transactionRequest.gasLimit = gasLimit
  } else if (gasEstimate) {
    transactionRequest.gasLimit = parseNumString(Math.round(gasEstimate.toNumber() * GAS_MULTIPLIER).toString(), "wei")
  }

  try {
    // using the lower level `Signer#sendTransaction` API here
    // since the basic 'contract.method()' (ie.
    // const ethersTx = await contract[method].apply(null, params))
    // one was intermittently
    // failing to get the nonce on Kovan w/ MetaMask
    ethersTx = await signer.sendTransaction(transactionRequest)

    setTx((tx) => ({
      ...tx,
      hash: ethersTx.hash,
      inWallet: false,
      sent: true
    }))

    await ethersTx.wait()

    setTx((tx) => ({
      ...tx,
      completed: true
    }))

    toast.success(`"${txName}" transaction successful!`)
  } catch (e) {
    console.error(e)

    if (e?.message?.match('User denied transaction signature')) {
      setTx((tx) => ({
        ...tx,
        // TODO: should be false, false, true. Need to add 'cancelled' states throughout the app.
        completed: true,
        error: true,
        cancelled: true
      }))

      toast.warn('Transaction cancelled')
      // You cancelled the transaction
    } else {
      setTx((tx) => ({
        ...tx,
        completed: true,
        error: true
      }))

      toast.error(`Error with "${txName}" - See JS Console for details`)
      console.error(e.message)
    }
  }
}
