import { DepositInformation, Organiser } from '@components/Competitions'
import { UpsideButton } from '@components/Form'
import { Layout } from '@components/layout/Layout'
import { TransactionForm } from '@components/TransactionForms'
import { useWallet } from '@hooks/useWallet'
import type { NextPage } from 'next'
import Image from 'next/image'
import * as React from 'react'
import { Button, Col, Container, Modal, Row } from 'react-bootstrap'
import { usePrizeStrategyContracts } from 'utils/hooks/usePrizeStrategyContracts'

import styles from './home.module.scss'

const data = {
  nftImage: '/images/nft-example-1.png',
  nftTitle: 'Bored Ape Yacht Club #3651',
  organiser: {
    avatarUrl: '/images/bankless-dao-logo.svg',
    name: 'BanklessDAO',
  },
}

const Home: NextPage = () => {
  const { isWalletConnected } = useWallet()
  const [openModal, setOpenModal] = React.useState(false)
  const { data: prizeStrategyContracts, isFetched: prizeStrategyIsFetched } = usePrizeStrategyContracts()

  if (!prizeStrategyIsFetched) return null

  let endDate: Date
  let totalDeposit: number
  if (typeof prizeStrategyContracts !== 'undefined') {
    endDate = prizeStrategyContracts.prizePeriodEndAt
    totalDeposit = Number(prizeStrategyContracts.totalDeposit)
  }

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
          <Button href="https://metaversal.banklesshq.com/" variant="light">
            Open Newsletter
          </Button>
        </div>
        <div className={styles.bodyContainer}>
          <Container fluid="xxl">
            <Row>
              <Col xs={12} lg={7}>
                <div className={styles.nftImage}>
                  <Image className="rounded" width="750" height="750" src={data.nftImage} alt={data.nftTitle} />
                </div>
              </Col>
              <Col xs={12} lg={5}>
                <div className={styles.outerContainer}>
                  <div className={styles.container}>
                    <span className={styles.title}>{data.nftTitle}</span>
                    <Organiser avatarUrl={data.organiser.avatarUrl} name={data.organiser.name} />
                    <DepositInformation totalDeposit={totalDeposit} endDate={endDate} />
                    <div className={styles.buttonContainer}>
                      <UpsideButton disabled={!isWalletConnected} onClick={handleDepositButtonClick}>
                        Deposit / Withdraw
                      </UpsideButton>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
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
