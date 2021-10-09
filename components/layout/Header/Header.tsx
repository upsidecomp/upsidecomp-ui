import { useAuth } from '@hooks/useAuth'
import cx from 'classnames'
import { ethers } from 'ethers'
import * as React from 'react'
import { Button, Container, Navbar, NavDropdown } from 'react-bootstrap'

import styles from './Header.module.scss'

export type HeaderProps = {
  id?: string
}

export const Header = (props: HeaderProps) => {
  const {
    isMainnet,
    connectToMetamask,
    disconnectFromWallet,
    networkName,
    accountAddress,
    upBankTokenAmount,
    bankTokenAmount,
  } = useAuth()

  return (
    <>
      {!isMainnet && networkName !== '' && (
        <div
          className={
            styles.warningContainer
          }>{`You're currently connected to ${networkName?.toUpperCase()} network`}</div>
      )}
      <Navbar
        bg="light"
        expand="lg"
        fixed="top"
        className={cx(styles.navbarArea, {
          [styles.navbarInTestnet]: !isMainnet && networkName !== '',
        })}>
        <Container>
          <Navbar.Brand href="/">
            <img className={styles.logo} src="/images/upside-logo.png" alt="Upside Competition" />
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            {accountAddress === '' && (
              <Button onClick={connectToMetamask} variant="outline-secondary">
                Connect Wallet
              </Button>
            )}
            {accountAddress !== '' && (
              <NavDropdown
                title={`Connected ${accountAddress.slice(0, 5)}....${accountAddress.slice(-5)}`}
                id="navbarScrollingDropdown">
                <NavDropdown.Item>{`${ethers.utils.formatUnits(bankTokenAmount)} $BANK`}</NavDropdown.Item>
                <NavDropdown.Item>{`${ethers.utils.formatUnits(upBankTokenAmount)} $upBANK`}</NavDropdown.Item>
              </NavDropdown>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}
