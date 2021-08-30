import { ethers } from 'ethers'
import { useState,useEffect} from "react";
import {useSendTransaction} from "./hooks/useSendTransaction"
import {usePrizePoolContracts} from "./hooks/usePrizePoolContracts"
import { Button } from 'react-bootstrap'
import {parseNumString} from "./libs/utils/parseNumString"
import BanklessPrizePoolAbi from '@upsidecomp/upsidecomp-contracts-bankless-core/abis/BanklessPrizePool.json'

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
  console.log("contractAddress", contractAddress)
  console.log("params", params)

  await sendTx(setTx, contractAddress, BanklessPrizePoolAbi, 'depositTo', 'Deposit', params, provider, usersAddress)
}

export const Deposit = ({ usersAddress }) => {
  const [depositAmount, setDepositAmount] = useState("100000")


  useEffect(async () => {
    const { prizePool: prizePoolAddress, ticket: { address: prizePoolTicketAddress, symbol: prizePoolTokenSymbol, decimals: prizePoolTokenSymbolDecimals  } } = await usePrizePoolContracts()
  })

  const sendTx = useSendTransaction()

  const [tx, setTx] = useState({
    inWallet: false,
    sent: false,
    completed: false
  })

  const handleSubmit = () => {
    const depositAmountBN = parseNumString(depositAmount, prizePoolTokenSymbolDecimals)
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum, "any")
      handleDepositSubmit(
        sendTx,
        setTx,
        usersAddress,
        prizePoolAddress,
        prizePoolTicketAddress,
        depositAmountBN,
        provider,
      )
    }
  }

  return (
    <Button onClick={() => handleSubmit()}>
      Deposit
    </Button>
  )
}
