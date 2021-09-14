import styles from './Organiser.module.scss'

type Props = {
  avatarUrl: string
  name: string
}

export const Organiser = ({ avatarUrl, name }: Props) => {
  return (
    <div className={styles.container}>
      <img src={avatarUrl} className={styles.avatar} alt="Avatar" />
      <div className={styles.detailContainer}>
        <span className={styles.label}>Host</span>
        <span className={styles.name}>{name}</span>
      </div>
    </div>
  )
}
