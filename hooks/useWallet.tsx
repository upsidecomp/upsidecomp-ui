import ERC20Upgradable from '@upsidecomp/upsidecomp-contracts-bankless-core/abis/ERC20Upgradeable.json'
import { ALLOWED_NETWORK, ERC20_CONTRACTS } from '@utils/constant'
import { getSelectedWallet, removeSelectedWallet, setSelectedWallet } from '@utils/cookies'
import Onboard from 'bnc-onboard'
import { API, Wallet } from 'bnc-onboard/dist/src/interfaces'
import { ethers } from 'ethers'
import * as React from 'react'

interface WalletMeta {
  connect: () => void
  disconnect: () => void
  address: string
  bankBalance: unknown
  upbankBalance: unknown
  network: number
  isWalletConnected: boolean
}

// @ts-expect-error
const WalletContext = React.createContext<WalletMeta>({})

export function WalletProvider({ children }) {
  const meta = useInitialWallet()

  return <WalletContext.Provider value={meta}>{children}</WalletContext.Provider>
}

export const useWallet = () => {
  return React.useContext(WalletContext)
}

const useInitialWallet = (): WalletMeta => {
  const [provider, setProvider] = React.useState<ethers.providers.Web3Provider>(undefined)
  const [onboard, setOnboard] = React.useState<API>(undefined)
  const [wallet, setWallet] = React.useState<Wallet>(undefined)
  const [address, setAddress] = React.useState('')
  const [network, setNetwork] = React.useState<number>(undefined)
  const [bankBalance, setBankBalance] = React.useState<string>(undefined)
  const [upbankBalance, setUpbankBalance] = React.useState<string>(undefined)

  const getOnboard = async () => {
    const subscriptions = {
      address: setAddress,
      network: setNetwork,
      balance: balance => {
        setMetadata()
      },
      wallet: (wallet: Wallet) => {
        if (wallet.provider) {
          setWallet(wallet)
          setProvider(new ethers.providers.Web3Provider(wallet.provider, 'any'))
          setSelectedWallet(wallet.name)
        } else {
          setWallet(undefined)
          setProvider(undefined)
          removeSelectedWallet()
        }
      },
    }

    return Onboard({
      hideBranding: true,
      networkId: 4, // Hardcode to Rinkeby for now
      darkMode: true,
      subscriptions,
      walletSelect: {
        wallets: [{ walletName: 'metamask', preferred: true }],
      },
      walletCheck: [{ checkName: 'connect' }, { checkName: 'accounts' }, { checkName: 'network' }],
    })
  }

  const handleLoadOnboard = async () => {
    const _onboard = await getOnboard()
    _onboard.walletSelect('MetaMask')
    setOnboard(_onboard)
  }

  React.useEffect(() => {
    handleLoadOnboard()
  }, [])

  React.useEffect(() => {
    const init = async () => {
      onboard.walletReset()
      const selectedWallet = getSelectedWallet()
      if (selectedWallet && selectedWallet !== '') {
        onboard.walletSelect(selectedWallet)
      }
    }

    if (onboard) {
      init()
    }
  }, [onboard])

  const setMetadata = React.useCallback(async () => {
    try {
      console.log('Update the metadata')
      const bankContract = new ethers.Contract(ERC20_CONTRACTS.bank, ERC20Upgradable, provider)
      const upBankContract = new ethers.Contract(ERC20_CONTRACTS.upBank, ERC20Upgradable, provider)
      const bankBalance = await bankContract.balanceOf(address)
      const upBankBalance = await upBankContract.balanceOf(address)
      setBankBalance(ethers.utils.formatUnits(bankBalance))
      setUpbankBalance(ethers.utils.formatUnits(upBankBalance))
    } catch (error) {
      console.log('Error: ', error)
      setBankBalance('0.00')
      setUpbankBalance('0.00')
    }
  }, [provider, address])

  React.useEffect(() => {
    const runMetadata = async () => {
      await setMetadata()
    }
    if (provider && address !== '') {
      runMetadata()
    }
  }, [provider, address, network])

  const connect = React.useCallback(async () => {
    try {
      // Let user select wallet
      const walletSelected = await onboard.walletSelect('MetaMask')
      if (!walletSelected) {
        return
      }

      const walletIsReady = await onboard.walletCheck()
      if (!walletIsReady) {
        return
      }
    } catch (e) {
      console.warn('Onboard error')
    }
  }, [onboard])

  const disconnect = React.useCallback(() => {
    onboard.walletReset()
  }, [onboard])

  return {
    connect,
    disconnect,
    address,
    bankBalance,
    upbankBalance,
    network,
    isWalletConnected: Boolean(wallet) && Boolean(address),
  }
}
