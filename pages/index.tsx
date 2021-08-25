import { DepositInformation, Organiser } from '@components/Competitions'
import { UpsideButton } from '@components/Form'
import { Layout } from '@components/layout/Layout'
import type { NextPage } from 'next'
import { Col, Row } from 'react-bootstrap'

import styles from './home.module.scss'

const data = {
  nftImage: '/images/nft-example.svg',
  nftTitle: 'Bored Ape Yatch Club #3651',
  organiser: {
    avatarUrl: '/images/avatar.svg',
    name: 'BoredApeYC',
  },
  competition: {
    totalDeposit: 100000,
    endDate: new Date('2021-08-30 23:59:59'),
  },
}

const Home: NextPage = () => {
  return (
    <Layout>
      <div className={styles.bannerContainer}>
        <h4 className={styles.subHeading}>Win NFT Prizes with $BANK</h4>
        <h3 className={styles.mainHeading}>BanklessDAO NFT Giveaways</h3>
      </div>
      <Row>
        <Col>
          <div className={styles.nftImage}>
            <img src={data.nftImage} alt={data.nftTitle} />
          </div>
        </Col>
        <Col>
          <div className={styles.container}>
            <div className={styles.title}>{data.nftTitle}</div>
            <Organiser avatarUrl={data.organiser.avatarUrl} name={data.organiser.name} />
            <DepositInformation totalDeposit={data.competition.totalDeposit} endDate={data.competition.endDate} />
            <div className={styles.buttonContainer}>
              <UpsideButton>Deposit to Competition</UpsideButton>
              <UpsideButton variant="upside-secondary">Withdraw from Competition</UpsideButton>
            </div>
          </div>
        </Col>
      </Row>
    </Layout>
  )
}

export default Home
