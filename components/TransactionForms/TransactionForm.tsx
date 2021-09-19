import * as React from 'react'
import { Button } from 'react-bootstrap'

import { DepositForm } from './DepositForm'
import styles from './TransactionForm.module.scss'
import { WithdrawForm } from './WithdrawForm'

export const TransactionForm = () => {
  const [formMode, setFormMode] = React.useState('deposit')

  const handleDepositButtonClick = () => {
    setFormMode('deposit')
  }

  const handleWithdrawButtonClick = () => {
    setFormMode('withdraw')
  }

  return (
    <div>
      <div className={styles.tabContainer}>
        <Button
          onClick={handleDepositButtonClick}
          className={styles.tabButton}
          variant={formMode === 'deposit' ? 'warning' : 'outline-warning'}>
          Deposit
        </Button>
        <Button
          onClick={handleWithdrawButtonClick}
          className={styles.tabButton}
          variant={formMode === 'withdraw' ? 'warning' : 'outline-warning'}>
          Withdraw
        </Button>
      </div>
      <div>
        {formMode === 'deposit' && <DepositForm />}
        {formMode === 'withdraw' && <WithdrawForm />}
      </div>
    </div>
  )
}
