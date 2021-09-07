import { ethers } from 'ethers'
import { useState, useEffect } from 'react'
import { useSendTransaction } from './hooks/useSendTransaction'
import { usePrizePoolContracts } from './hooks/usePrizePoolContracts'
import { Button } from 'react-bootstrap'
import { parseNumString } from './libs/utils/parseNumString'
import BanklessPrizePoolAbi from '@upsidecomp/upsidecomp-contracts-bankless-core/abis/BanklessPrizePool.json'
import ERC20Upgradable from '@upsidecomp/upsidecomp-contracts-bankless-core/abis/ERC20Upgradeable.json'
import BankAbi from './libs/abis/Bank.json'
import { useProvider } from './useProvider'

const handleDepositSubmit = async (
  sendTx,
  setTx,
  usersAddress,
  contractAddress,
  ticketAddress,
  depositAmountBN,
  provider,
) => {
  const referrer = ethers.constants.AddressZero // TODO

  const params = [usersAddress, depositAmountBN, ticketAddress, referrer]
  console.log('contractAddress', contractAddress)
  console.log('params', params)

  await sendTx(setTx, contractAddress, BanklessPrizePoolAbi, 'depositTo', 'Deposit', params, provider, usersAddress)
}

export const Deposit = ({ usersAddress }) => {
  const [depositAmount, setDepositAmount] = useState('100000')
  const { data: prizePoolContracts, isFetched: prizePoolContractsIsFetched } = usePrizePoolContracts()

  const sendTx = useSendTransaction()

  const [tx, setTx] = useState({
    inWallet: false,
    sent: false,
    completed: false,
  })

  if (!prizePoolContractsIsFetched) return null

  const prizePoolAddress = prizePoolContracts.prizePool.address
  const ticketAddress = prizePoolContracts.ticket.address
  const tokenSymbol = 'BANK' // fix
  const ticketSymbol = 'upBANK' // fix

  const handleSubmit = async () => {
    const depositAmountBN = parseNumString(depositAmount, 18)
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum, 'any')
      const signer = provider.getSigner()
      const bankContractAddress = "0x1CF12Dbe0d132EEddAc7ce9a0008e0e3362656cf"
      // const bankContract = new ethers.Contract('0x1CF12Dbe0d132EEddAc7ce9a0008e0e3362656cf', ERC20Upgradable, provider)
      // const bankWithSigner = bankContract.connect(signer)
      // const approveTokens = await bankWithSigner.approve(window.ethereum.selectedAddress, 100) // token approved, what next?
      const prizePoolContract = new ethers.Contract(prizePoolAddress, BanklessPrizePoolAbi, signer)
      await prizePoolContract.depositTo(window.ethereum.selectedAddress, 100, bankContractAddress, ethers.constants.AddressZero)

      // if (approveTokens) {
      //   handleDepositSubmit(sendTx, setTx, usersAddress, prizePoolAddress, ticketAddress, depositAmountBN, provider)
      // }
    }
  }

  return <Button onClick={() => handleSubmit()}>Deposit</Button>
}
