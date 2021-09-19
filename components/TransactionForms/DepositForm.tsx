import ERC20Upgradable from '@upsidecomp/upsidecomp-contracts-bankless-core/abis/ERC20Upgradeable.json'
import { ethers } from 'ethers'
import * as React from 'react'
import { Button, Form, InputGroup } from 'react-bootstrap'
import { ERC20_CONTRACTS } from 'utils/constant'

import styles from './DepositForm.module.scss'

export const DepositForm = () => {
  const [availableToken, setAvailableToken] = React.useState('0')
  const [depositAmount, setDepositAmount] = React.useState(0)

  React.useEffect(() => {
    const init = async () => {
      if (typeof window.ethereum !== 'undefined') {
        const provider = new ethers.providers.Web3Provider(window.ethereum, 'any')
        const signer = provider.getSigner()
        const bankContract = new ethers.Contract(ERC20_CONTRACTS.bank, ERC20Upgradable, provider)
        const myAddress = await signer.getAddress()
        const balance = await bankContract.balanceOf(myAddress)
        setAvailableToken(ethers.utils.formatUnits(balance))
      }
    }
    init()
  }, [])

  const handleMaxButtonClick = () => {
    setDepositAmount(availableToken !== '' ? parseFloat(availableToken) : 0)
  }

  return (
    <Form className={styles.formContainer}>
      <div className={styles.subtitle}>Please input how much BANK token you want to deposit</div>
      <InputGroup hasValidation>
        <Form.Control
          type="number"
          value={depositAmount}
          onChange={e => {
            setDepositAmount(e.currentTarget.value !== '' ? parseFloat(e.currentTarget.value) : 0)
          }}
          required
        />
        <InputGroup.Text>BANK</InputGroup.Text>
        <Form.Control.Feedback type="invalid">Please input the amount</Form.Control.Feedback>
      </InputGroup>
      <Form.Text id="passwordHelpBlock" muted>
        {`Balance: ${availableToken}`}
      </Form.Text>
      <a role="button" className={styles.maxButton} onClick={handleMaxButtonClick}>
        Max
      </a>

      <Button className={styles.confirmButton} variant="secondary" disabled={depositAmount === 0}>
        {depositAmount === 0 ? 'Enter an amount' : 'Confirm'}
      </Button>
    </Form>
  )
}
