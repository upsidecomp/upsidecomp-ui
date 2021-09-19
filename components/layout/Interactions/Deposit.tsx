import BanklessPrizePoolAbi from '@upsidecomp/upsidecomp-contracts-bankless-core/abis/BanklessPrizePool.json'
import ERC20Upgradable from '@upsidecomp/upsidecomp-contracts-bankless-core/abis/ERC20Upgradeable.json'
import { ethers } from 'ethers'
import { useState } from 'react'
import { Button } from 'react-bootstrap'
import { ERC20_CONTRACTS } from 'utils/constant'
import { usePrizePoolContracts } from 'utils/hooks/usePrizePoolContracts'
import { useSendTransaction } from 'utils/hooks/useSendTransaction'
import { parseNumString } from 'utils/libs/parseNumString'

declare global {
  interface Window {
    ethereum: any
  }
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

  await sendTx(setTx, contractAddress, BanklessPrizePoolAbi, 'depositTo', 'Deposit', params, provider, usersAddress)
}

export const Deposit = ({ usersAddress }: any) => {
  const [depositAmount, setDepositAmount] = useState('10')
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
  if (typeof prizePoolContracts !== 'undefined') {
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
      const bankContract: ethers.Contract = new ethers.Contract(ERC20_CONTRACTS.bank, ERC20Upgradable, provider)
      const bankWithSigner = bankContract.connect(signer)

      // NOTE: Approval event is based on event of transaction receipt
      // and not from polling
      const tx: ethers.ContractTransaction = await bankWithSigner.approve(prizePoolAddress, depositAmountBN) //
      const txReceipt: ethers.ContractReceipt = await tx.wait()
      const event = txReceipt.events?.find(event => event.event === 'Approval')

      if (event) {
        await handleDepositSubmit(
          sendTx,
          setTx,
          usersAddress,
          prizePoolAddress,
          ticketAddress,
          depositAmountBN,
          provider,
        )
      }
    }
  }

  return <Button onClick={() => handleSubmit()}>Deposit</Button>
}
