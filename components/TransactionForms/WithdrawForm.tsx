import ERC20Upgradable from '@upsidecomp/upsidecomp-contracts-bankless-core/abis/ERC20Upgradeable.json'
import { ethers } from 'ethers'
import * as React from 'react'
import { Alert, Button, Form, InputGroup } from 'react-bootstrap'
import { ERC20_CONTRACTS } from 'utils/constant'
import BanklessPrizePoolAbi from '@upsidecomp/upsidecomp-contracts-bankless-core/abis/BanklessPrizePool.json'
import { usePrizePoolContracts } from '@utils/hooks/usePrizePoolContracts'
import { callTransaction } from '@utils/libs/callTransaction'
import { parseNumString } from '@utils/libs/parseNumString'

import styles from './WithdrawForm.module.scss'

export const WithdrawForm = () => {
  const [availableToken, setAvailableToken] = React.useState('0')
  const [withdrawAmount, setWithdrawAmount] = React.useState(0)
  const [loading, setLoading] = React.useState(false)
  const [errorMessage, setErrrorMessage] = React.useState('')
  const [successMessage, setSuccessMessage] = React.useState('')

  React.useEffect(() => {
    const init = async () => {
      if (typeof window.ethereum !== 'undefined') {
        const provider = new ethers.providers.Web3Provider(window.ethereum, 'any')
        const signer = provider.getSigner()
        const upBankContract = new ethers.Contract(ERC20_CONTRACTS.upBank, ERC20Upgradable, provider)
        const myAddress = await signer.getAddress()
        const balance = await upBankContract.balanceOf(myAddress)
        setAvailableToken(ethers.utils.formatUnits(balance))
      }
    }
    init()
  }, [])

  const handleMaxButtonClick = () => {
    setWithdrawAmount(availableToken !== '' ? parseFloat(availableToken) : 0)
  }

  const [tx, setTx] = React.useState({
    inWallet: false,
    sent: false,
    completed: false,
  })
  const { data: prizePoolContracts } = usePrizePoolContracts()

  const handleConfirmButtonClick = React.useCallback(async () => {
    setLoading(true)
    setErrrorMessage('')
    setSuccessMessage('')
    try {
      const withdrawAmountBN: ethers.BigNumber = parseNumString(withdrawAmount.toString(), 18)
      if (typeof window.ethereum !== 'undefined') {
        const provider = new ethers.providers.Web3Provider(window.ethereum, 'any')
        const signer = provider.getSigner()
        const upBankContract: ethers.Contract = new ethers.Contract(ERC20_CONTRACTS.upBank, ERC20Upgradable, provider)
        const upBankWithSigner = upBankContract.connect(signer)

        let prizePoolAddress: string
        let ticketAddress: string
        let prizePoolAbi : ethers.ContractInterface
        if (typeof prizePoolContracts !== 'undefined') {
          prizePoolAddress = prizePoolContracts.prizePool.address
          ticketAddress = prizePoolContracts.ticket.address
          prizePoolAbi = prizePoolContracts.prizePool.contract
        }

        const userAddress = window.ethereum.selectedAddress

        const prizePoolContract: ethers.Contract = new ethers.Contract(prizePoolAddress, prizePoolAbi, provider)
        const prizePoolContractSigner: ethers.Contract = prizePoolContract.connect(signer)
        const feeTx: ethers.ContractTransaction = await prizePoolContractSigner.calculateEarlyExitFee(userAddress, ERC20_CONTRACTS.bank, withdrawAmountBN)
        const feeTxReceipt: ethers.ContractReceipt = await feeTx.wait()
        console.log("feeTxReceipt: ", feeTxReceipt)

        // NOTE: Approval event is based on event of transaction receipt
        // and not from polling
        // const tx: ethers.ContractTransaction = await upBankWithSigner.approve(prizePoolAddress, withdrawAmountBN) //
        // const txReceipt: ethers.ContractReceipt = await tx.wait()
        // const event = txReceipt.events?.find(event => event.event === 'Approval')

        // if (event) {
        //   const referrer = ethers.constants.AddressZero // TODO
        //   const userAddress = window.ethereum.selectedAddress
          //
          // const prizePoolContract: ethers.Contract = new ethers.Contract(prizePoolAddress, prizePoolAbi, provider)
          // const prizePoolContractSigner: ethers.Contract = prizePoolContract.connect(signer)
          // const feeTx: ethers.ContractTransaction = await prizePoolContractSigner.calculateEarlyExitFee(userAddress, ERC20_CONTRACTS.bank, withdrawAmountBN)
          // const feeTxReceipt: ethers.ContractReceipt = await feeTx.wait()
          // console.log("feeTxReceipt: ", feeTxReceipt)

          // const params = [userAddress, withdrawAmountBN, ticketAddress, referrer]
          //
          // const response = await callTransaction(
          //   setTx,
          //   provider,
          //   userAddress,
          //   prizePoolAddress,
          //   BanklessPrizePoolAbi,
          //   'withdrawInstantlyFrom',
          //   'Withdraw',
          //   params,
          // )
          // const balance = await upBankContract.balanceOf(userAddress)
          // setAvailableToken(balance)
          // setWithdrawAmount(0)
          // setSuccessMessage(response)
        // }
        setLoading(false)
      }
    } catch (error) {
      setLoading(false)
      setErrrorMessage(error.message)
    }
  }, [withdrawAmount])

  return (
    <Form className={styles.formContainer}>
      <div className={styles.subtitle}>Please input how much upBANK token you want to withdraw</div>
      <InputGroup hasValidation>
        <Form.Control
          value={withdrawAmount}
          onChange={e => {
            setWithdrawAmount(e.currentTarget.value !== '' ? parseFloat(e.currentTarget.value) : 0)
          }}
          type="number"
          required
        />
        <InputGroup.Text>upBANK</InputGroup.Text>
        <Form.Control.Feedback type="invalid">Please input the amount</Form.Control.Feedback>
      </InputGroup>
      <Form.Text id="passwordHelpBlock" muted>
        {`Balance: ${availableToken}`}
      </Form.Text>
      <a tabIndex={0} role="button" className={styles.maxButton} onClick={handleMaxButtonClick}>
        Max
      </a>

      <Button
        onClick={handleConfirmButtonClick}
        className={styles.confirmButton}
        variant="secondary"
        disabled={withdrawAmount === 0}>
        {withdrawAmount === 0 ? 'Enter an amount' : 'Confirm'}
      </Button>
      {successMessage !== '' && <Alert variant="success">{successMessage}</Alert>}
      {errorMessage !== '' && <Alert variant="danger">{errorMessage}</Alert>}
    </Form>
  )
}
