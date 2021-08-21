import { ethers } from 'ethers'
import * as React from 'react'
import { Button, Container, Navbar } from 'react-bootstrap'

import styles from './Header.module.scss'

export type HeaderProps = {
  id?: string
}

export const Header = (props: HeaderProps) => {
  const [accountAddress, setAccountAddress] = React.useState('')

  const infuraProvider = new ethers.providers.InfuraProvider("rinkeby", process.env.NEXT_JS_INFURA_ID)

  const testQuery = async () => {
    console.log(await infuraProvider.getBlockNumber())
  }

  const connectButtonOnClick = async () => {
    // @ts-ignore
    if (typeof window.ethereum !== 'undefined') {
      // @ts-ignore
      const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' })
      // @ts-ignore
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()

      setAccountAddress(account)
    }
  }

  React.useEffect(() => {
    const init = async () => {
      // @ts-ignore
      if (typeof window.ethereum !== 'undefined') {
        // @ts-ignore
        const address = window.ethereum.selectedAddress
        setAccountAddress(address || '')
      }
      await testQuery()
    }
    init()
  }, [])

  return (
    <Navbar bg="light" expand="lg" className={styles.navbarArea}>
      <Container>
        <Navbar.Brand href="/">
          <img className={styles.logo} src="/images/upside-logo.png" alt="Upside Competition" />
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          {accountAddress === '' && (
            <Button onClick={connectButtonOnClick} variant="outline-secondary">
              Connect Wallet
            </Button>
          )}
          {accountAddress !== '' && <Navbar.Text>Signed in as: {accountAddress}</Navbar.Text>}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
