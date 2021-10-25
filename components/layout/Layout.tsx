import { useWallet } from '@hooks/useWallet'
import cx from 'classnames'
import Head from 'next/head'
import * as React from 'react'
import { Container } from 'react-bootstrap'

import { Header } from './Header/Header'
import styles from './Layout.module.scss'

type Props = {
  children: React.ReactNode
}

export const Layout = ({ children }: Props) => {
  const { isWalletConnected, network } = useWallet()
  const description =
    'Win great prizes by saving in an insured digital wallet. The more money you save, the greater your chance to win!'
  return (
    <>
      <Head>
        <title>Upside Competition</title>
        <meta name="description" content={description} />
      </Head>
      <Container fluid className="p-4 vh-100">
        <Header />
        <main
          className={cx(styles.mainContent, {
            [styles.inTestnet]: isWalletConnected && network !== 1,
          })}
        >
          {children}
        </main>
      </Container>
    </>
  )
}
