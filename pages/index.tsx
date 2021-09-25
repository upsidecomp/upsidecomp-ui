import { DepositInformation, Organiser } from '@components/Competitions'
import { UpsideButton } from '@components/Form'
import { Layout } from '@components/layout/Layout'
import { TransactionForm } from '@components/TransactionForms'
import type { NextPage } from 'next'
import * as React from 'react'
import { Col, Modal, Row } from 'react-bootstrap'

import styles from './home.module.scss'

const data = {
  nftImage: '/images/nft-example.svg',
  nftTitle: 'Bored Ape Yatch Club #3651',
  organiser: {
    avatarUrl: '/images/bankless-dao-logo.svg',
    name: 'BanklessDAO',
  },
  competition: {
    totalDeposit: 100000,
    endDate: new Date('2021-10-31 23:59:59'),
  },
}

const Home: NextPage = () => {
  const [openModal, setOpenModal] = React.useState(false)

  const handleDepositButtonClick = () => {
    setOpenModal(true)
  }

  const handleModalCloseButtonClick = () => {
    setOpenModal(false)
  }

  return (
    <>
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
                <UpsideButton onClick={handleDepositButtonClick}>Deposit / Withdraw</UpsideButton>
              </div>
            </div>
          </Col>
        </Row>
      </Layout>
      <Modal show={openModal} centered onHide={handleModalCloseButtonClick}>
        <Modal.Header closeButton={true}>
          <Modal.Title>Withdraw/Deposit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TransactionForm />
        </Modal.Body>
      </Modal>
    </>
  )
}

export default Home
