import BanklessPrizePoolAbi from '@upsidecomp/upsidecomp-contracts-bankless-core/abis/BanklessPrizePool.json'
import ERC20Upgradable from '@upsidecomp/upsidecomp-contracts-bankless-core/abis/ERC20Upgradeable.json'
import { ERC20_CONTRACTS } from '@utils/constant'
import { usePrizePoolContracts } from '@utils/hooks/usePrizePoolContracts'
import { callTransaction } from '@utils/libs/callTransaction'
import { parseNumString } from '@utils/libs/parseNumString'
import { ethers } from 'ethers'
import * as React from 'react'
import { Alert, Button, Form, InputGroup } from 'react-bootstrap'

import styles from './DepositForm.module.scss'

export const DepositForm = () => {
  const [availableToken, setAvailableToken] = React.useState('0')
  const [depositAmount, setDepositAmount] = React.useState(0)
  const [depositAmountText, setDepositAmountText] = React.useState('0')
  const [loading, setLoading] = React.useState(false)
  const [errorMessage, setErrrorMessage] = React.useState('')
  const [successMessage, setSuccessMessage] = React.useState('')

  React.useEffect(() => {
    const init = async () => {
      try {
        if (typeof window.ethereum !== 'undefined') {
          const provider = new ethers.providers.Web3Provider(window.ethereum, 'any')
          const signer = provider.getSigner()
          const bankContract = new ethers.Contract(ERC20_CONTRACTS.bank, ERC20Upgradable, provider)
          const myAddress = await signer.getAddress()
          const balance = await bankContract.balanceOf(myAddress)
          setAvailableToken(ethers.utils.formatUnits(balance))
        }
      } catch (error) {
        // Do nothing here, most likely wrong error and can't fetch the balance
      }
    }
    init()
  }, [])

  const handleMaxButtonClick = () => {
    setDepositAmount(availableToken !== '' ? parseFloat(availableToken) : 0)
    setDepositAmountText(availableToken)
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
      const depositAmountBN: ethers.BigNumber = parseNumString(depositAmount.toString(), 18)
      if (typeof window.ethereum !== 'undefined') {
        const provider = new ethers.providers.Web3Provider(window.ethereum, 'any')
        const signer = provider.getSigner()
        const bankContract: ethers.Contract = new ethers.Contract(ERC20_CONTRACTS.bank, ERC20Upgradable, provider)
        const bankWithSigner = bankContract.connect(signer)

        let prizePoolAddress: string
        let ticketAddress: string
        if (typeof prizePoolContracts !== 'undefined') {
          prizePoolAddress = prizePoolContracts.prizePool.address
          ticketAddress = prizePoolContracts.ticket.address
        }

        // NOTE: Approval event is based on event of transaction receipt
        // and not from polling
        const tx: ethers.ContractTransaction = await bankWithSigner.approve(prizePoolAddress, depositAmountBN) //
        const txReceipt: ethers.ContractReceipt = await tx.wait()
        const event = txReceipt.events?.find(event => event.event === 'Approval')

        if (event) {
          const referrer = ethers.constants.AddressZero // TODO
          const userAddress = window.ethereum.selectedAddress
          const params = [userAddress, depositAmountBN, ticketAddress, referrer]

          const response = await callTransaction(
            setTx,
            provider,
            userAddress,
            prizePoolAddress,
            BanklessPrizePoolAbi,
            'depositTo',
            'Deposit',
            params,
          )
          const balance = await bankContract.balanceOf(userAddress)
          setAvailableToken(ethers.utils.formatUnits(balance))
          setDepositAmount(0)
          setDepositAmountText('0')
          setSuccessMessage(response)
        }
        setLoading(false)
      }
    } catch (error) {
      setLoading(false)
      setErrrorMessage(error.message)
    }
  }, [depositAmount])

  return (
    <>
      <Form className={styles.formContainer}>
        <div className={styles.subtitle}>Please input how much BANK token you want to deposit</div>
        <InputGroup hasValidation>
          <Form.Control
            type="number"
            value={depositAmountText}
            onChange={e => {
              setDepositAmountText(e.currentTarget.value)
              if (e.currentTarget.value !== '') {
                setDepositAmount(parseFloat(e.currentTarget.value))
              }
            }}
            required
          />
          <InputGroup.Text>BANK</InputGroup.Text>
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
          disabled={depositAmount === 0 || loading}>
          {depositAmount === 0 ? 'Enter an amount' : loading ? 'Processing...' : 'Confirm'}
        </Button>
        {successMessage !== '' && <Alert variant="success">{successMessage}</Alert>}
        {errorMessage !== '' && <Alert variant="danger">{errorMessage}</Alert>}
      </Form>
    </>
  )
}
