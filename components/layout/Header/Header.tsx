import { useWallet } from '@hooks/useWallet'
import { NETWORK_NAME } from '@utils/constant'
import cx from 'classnames'
import * as React from 'react'
import { Button, Container, Navbar, NavDropdown } from 'react-bootstrap'
import Image from "next/image"

import styles from './Header.module.scss'

export type HeaderProps = {
  id?: string
}

export const Header = (props: HeaderProps) => {
  const { connect, disconnect, address, bankBalance, upbankBalance, network, isWalletConnected } = useWallet()

  const isMainnet = network === 1

  return (
    <>
      {isWalletConnected && !isMainnet && (
        <div className={styles.warningContainer}>
          <small>
            {`You're currently connected to ${NETWORK_NAME[
              network
            ] ?.toUpperCase()} network`}
          </small>
        </div>
      )}
      <Navbar
        bg="light"
        expand="lg"
        fixed="top"
        className={cx(styles.navbarArea, {
          [styles.navbarInTestnet]: isWalletConnected && !isMainnet,
        })}>
        <Container>
          <Navbar.Brand href="/">
            <Image width="40px" height="51.34px" src="/images/Upside_U_Red.png" alt="Upside Competition" />
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            {isWalletConnected ? (
              <NavDropdown
                title={`Connected ${address.slice(0, 5)}....${address.slice(-5)}`}
                id="navbarScrollingDropdown">
                <NavDropdown.Item>{`${bankBalance} BANK`}</NavDropdown.Item>
                <NavDropdown.Item>{`${upbankBalance} upBANK`}</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item role="button" onClick={disconnect}>
                  Disconnect
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
                <Button onClick={connect} variant="outline-secondary">
                  Connect Wallet
                </Button>
              )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}
