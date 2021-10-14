import { DepositInformation, Organiser } from '@components/Competitions'
import { UpsideButton } from '@components/Form'
import { Layout } from '@components/layout/Layout'
import { TransactionForm } from '@components/TransactionForms'
import ERC721MintableAbi from '@upsidecomp/upsidecomp-contracts-bankless-core/abis/ERC721Mintable.json'
import { ethers } from 'ethers'
import { useWallet } from '@hooks/useWallet'
import type { NextPage } from 'next'
import * as React from 'react'
import { Col, Modal, Row } from 'react-bootstrap'
import { usePrizeStrategyContracts } from 'utils/hooks/usePrizeStrategyContracts'
import { useProvider } from 'utils/hooks/useProvider'

import styles from './home.module.scss'

const data = {
  nftImage: '/images/nft-example-1.png',
  nftTitle: 'Bored Ape Yatch Club #3651',
  organiser: {
    avatarUrl: '/images/bankless-dao-logo.svg',
    name: 'BanklessDAO',
  },
}

const prizeData: Array<any> = [
  {
    nftImage: '/images/nft-example-1.png',
    nftTitle: 'Bored Ape Yatch Club #3651',
    organiser: {
      avatarUrl: '/images/bankless-dao-logo.svg',
      name: 'BanklessDAO',
    },
  },
  {
    nftImage: '/images/nft-example-1.png',
    nftTitle: 'Bored Ape Yatch Club #3651',
    organiser: {
      avatarUrl: '/images/bankless-dao-logo.svg',
      name: 'BanklessDAO',
    },
  },
  {
    nftImage: '/images/nft-example-1.png',
    nftTitle: 'Bored Ape Yatch Club #3651',
    organiser: {
      avatarUrl: '/images/bankless-dao-logo.svg',
      name: 'BanklessDAO',
    },
  },
  {
    nftImage: '/images/nft-example-1.png',
    nftTitle: 'Bored Ape Yatch Club #3651',
    organiser: {
      avatarUrl: '/images/bankless-dao-logo.svg',
      name: 'BanklessDAO',
    },
  },
  {
    nftImage: '/images/nft-example-1.png',
    nftTitle: 'Bored Ape Yatch Club #3651',
    organiser: {
      avatarUrl: '/images/bankless-dao-logo.svg',
      name: 'BanklessDAO',
    },
  },
  {
    nftImage: '/images/nft-example-1.png',
    nftTitle: 'Bored Ape Yatch Club #3651',
    organiser: {
      avatarUrl: '/images/bankless-dao-logo.svg',
      name: 'BanklessDAO',
    },
  },
]

const Home: NextPage = () => {
  const { isWalletConnected } = useWallet()
  const [openModal, setOpenModal] = React.useState(false)
  const { data: prizeStrategyContracts, isFetched: prizeStrategyIsFetched } = usePrizeStrategyContracts()

  if (!prizeStrategyIsFetched) return null

  let endDate: Date
  let totalDeposit: number
  let prizes: Array<any>
  if (typeof prizeStrategyContracts !== 'undefined') {
    endDate = prizeStrategyContracts.prizePeriodEndAt
    totalDeposit = prizeStrategyContracts.totalDeposit
    prizes = prizeStrategyContracts.prizes
    totalDeposit = Number(prizeStrategyContracts.totalDeposit)
  }

  const handleDepositButtonClick = async () => {
    setOpenModal(true)
    const infuraProvider = useProvider()
    for (let prize of prizes) {
      const erc721Contract = new ethers.Contract(prize.address, ERC721MintableAbi, infuraProvider)
      // const owner = await erc721Contract.tokenURI(prize.tokenIds[0])
      const supply = await erc721Contract.totalSupply()
      // console.log(supply)
      // console.log(erc721Contract)
      // console.log(prize)
    }
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
          <div className={styles.container}>
            <div className={styles.title}>{data.nftTitle}</div>
            <Organiser avatarUrl={data.organiser.avatarUrl} name={data.organiser.name} />
            <DepositInformation totalDeposit={totalDeposit} endDate={endDate} />
            <div className={styles.buttonContainer}>
              <UpsideButton disabled={!isWalletConnected} onClick={handleDepositButtonClick}>
                Deposit / Withdraw
              </UpsideButton>
            </div>
          </div>
        </Row>
        <Row lg="3" xs="1">
          {prizeData.map((prize: any) => {
            return (
              <Col>
                <div className={styles.nftImage}>
                  <img src={prize.nftImage} alt={prize.nftTitle} />
                </div>
              </Col>
            )
          })}
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
