import { ethers } from 'ethers'
import { useState, useEffect } from 'react'
import { useSendTransaction } from './hooks/useSendTransaction'
import { usePrizePoolContracts } from './hooks/usePrizePoolContracts'
import { Button } from 'react-bootstrap'
import { parseNumString } from './libs/utils/parseNumString'
import BanklessPrizePoolAbi from '@upsidecomp/upsidecomp-contracts-bankless-core/abis/BanklessPrizePool.json'
import ERC20Upgradable from '@upsidecomp/upsidecomp-contracts-bankless-core/abis/ERC20Upgradeable.json'

declare global {
  interface Window { ethereum: any }
}

const handleDepositSubmit = async (
  sendTx: any,
  setTx: any,
  usersAddress: string,
  contractAddress: string,
  ticketAddress: string,
  depositAmountBN: ethers.BigNumber,
  provider: ethers.providers.Web3Provider,
) => {
  const referrer = ethers.constants.AddressZero // TODO

  const params = [usersAddress, depositAmountBN, ticketAddress, referrer]
  // console.log('contractAddress', contractAddress)
  // console.log('params', params)

  await sendTx(setTx, contractAddress, BanklessPrizePoolAbi, 'depositTo', 'Deposit', params, provider, usersAddress)
}

export const Deposit = ({ usersAddress }: any) => {
  const [depositAmount, setDepositAmount] = useState("100")
  const { data: prizePoolContracts, isFetched: prizePoolContractsIsFetched } = usePrizePoolContracts()

  const sendTx = useSendTransaction()

  const [tx, setTx] = useState({
    inWallet: false,
    sent: false,
    completed: false,
  })

  if (!prizePoolContractsIsFetched) return null

  let prizePoolAddress: string
  let ticketAddress: string
  if (typeof prizePoolContracts !== "undefined") {
    prizePoolAddress = prizePoolContracts.prizePool.address
    ticketAddress = prizePoolContracts.ticket.address
  }
  const tokenSymbol = 'BANK' // fix
  const ticketSymbol = 'upBANK' // fix

  const handleSubmit = async () => {
    const depositAmountBN: ethers.BigNumber = parseNumString(depositAmount, 18)
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum, 'any')
      const signer = provider.getSigner()
      const bankContractAddress = '0x1CF12Dbe0d132EEddAc7ce9a0008e0e3362656cf'
      const bankContract = new ethers.Contract(bankContractAddress, ERC20Upgradable, provider)
      const bankWithSigner = bankContract.connect(signer)
      await bankWithSigner.approve(prizePoolAddress, depositAmountBN) // token approved, what next?
      bankContract.on('Approval', async (owner: any, spender: any, amount: any) => {
        console.log({owner, spender, amount})
        await handleDepositSubmit(
          sendTx,
          setTx,
          usersAddress,
          prizePoolAddress,
          ticketAddress,
          depositAmountBN,
          provider,
        )
      })
    }
  }

  return <Button onClick={() => handleSubmit()}>Deposit</Button>
}
