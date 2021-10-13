import numbro from 'numbro'

import styles from './DepositInformation.module.scss'
import { Timer } from './Timer'

type Props = {
  totalDeposit: number
  endDate: Date
}

export const DepositInformation = ({ endDate, totalDeposit }: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.subHeader}>Total Deposits</div>
      <div className={styles.totalDeposit}>{`${
        totalDeposit > 9999
          ? numbro(totalDeposit).format({ average: true, lowPrecision: false }).toUpperCase()
          : totalDeposit
      } BANK`}</div>
      <div className={styles.subHeader}>Competition ending in</div>
      <Timer endDate={endDate} />
    </div>
  )
}
