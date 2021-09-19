import ERC20Upgradable from '@upsidecomp/upsidecomp-contracts-bankless-core/abis/ERC20Upgradeable.json'
import { ethers } from 'ethers'
import * as React from 'react'
import { Button, Form, InputGroup } from 'react-bootstrap'
import { ERC20_CONTRACTS } from 'utils/constant'

import styles from './WithdrawForm.module.scss'

export const WithdrawForm = () => {
  const [availableToken, setAvailableToken] = React.useState('0')
  const [withdrawAmount, setWithdrawAmount] = React.useState(0)

  React.useEffect(() => {
    const init = async () => {
      if (typeof window.ethereum !== 'undefined') {
        const provider = new ethers.providers.Web3Provider(window.ethereum, 'any')
        const signer = provider.getSigner()
        const bankContract = new ethers.Contract(ERC20_CONTRACTS.upBank, ERC20Upgradable, provider)
        const myAddress = await signer.getAddress()
        const balance = await bankContract.balanceOf(myAddress)
        setAvailableToken(ethers.utils.formatUnits(balance))
      }
    }
    init()
  }, [])

  const handleMaxButtonClick = () => {
    setWithdrawAmount(availableToken !== '' ? parseFloat(availableToken) : 0)
  }

  return (
    <Form className={styles.formContainer}>
      <div className={styles.subtitle}>Please input how much upBANK token you want to withdraw</div>
      <InputGroup hasValidation>
        <Form.Control
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
      <a role="button" className={styles.maxButton} onClick={handleMaxButtonClick}>
        Max
      </a>

      <Button className={styles.confirmButton} variant="secondary" disabled={withdrawAmount === 0}>
        {withdrawAmount === 0 ? 'Enter an amount' : 'Confirm'}
      </Button>
    </Form>
  )
}
