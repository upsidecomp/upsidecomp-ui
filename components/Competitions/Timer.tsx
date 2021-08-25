import * as React from 'react'

import styles from './Timer.module.scss'

type Props = {
  endDate: Date
}

export const Timer = ({ endDate }: Props) => {
  const calculateTimeLeft = () => {
    const difference = +endDate - +new Date()

    if (difference > 0) {
      return {
        hours: Math.floor(difference / (1000 * 60 * 60)),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      }
    }

    return {
      hours: 0,
      minutes: 0,
      seconds: 0,
    }
  }

  const [timeLeft, setTimeLeft] = React.useState<{ hours: number; minutes: number; seconds: number }>(
    calculateTimeLeft(),
  )

  React.useEffect(() => {
    setTimeout(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)
  })

  return (
    <div className={styles.timer}>
      <div className={styles.timerItem}>
        <span>{timeLeft.hours}</span>
        <span>Hrs</span>
      </div>
      <div className={styles.timerItem}>
        <span>{timeLeft.minutes}</span>
        <span>Mins</span>
      </div>
      <div className={styles.timerItem}>
        <span>{timeLeft.seconds}</span>
        <span>Sec</span>
      </div>
    </div>
  )
}
