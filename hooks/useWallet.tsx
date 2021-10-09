import ERC20Upgradable from '@upsidecomp/upsidecomp-contracts-bankless-core/abis/ERC20Upgradeable.json'
import { ALLOWED_NETWORK, ERC20_CONTRACTS } from '@utils/constant'
import { ethers } from 'ethers'
import * as React from 'react'

interface Metadata {
  connectToMetamask: () => void
  disconnectFromWallet: () => void
  accountAddress: string
  bankTokenAmount: unknown
  upBankTokenAmount: unknown
  networkName: string
  isMainnet: boolean
}

const AuthContext = React.createContext<Metadata>({
  connectToMetamask: null,
  disconnectFromWallet: null,
  accountAddress: '',
  bankTokenAmount: 0,
  upBankTokenAmount: 0,
  networkName: '',
  isMainnet: false,
})

export function AuthProvider({ children }) {
  const meta = useMetamaskAuth()

  return <AuthContext.Provider value={meta}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  return React.useContext(AuthContext)
}

const useMetamaskAuth = (): Metadata => {
  const [provider, setProvider] = React.useState(undefined)
  const [address, setAddress] = React.useState('')
  const [bankBalance, setBankBalance] = React.useState<string>(undefined)
  const [upbankBalance, setUpbankBalance] = React.useState<string>(undefined)
  const [network, setNetwor] = React.useState('')
  const [isMainnet, setIsMainnet] = React.useState(false)

  console.log('Provider: ', provider)

  React.useEffect(() => {
    const init = async () => {
      // @ts-ignore
      if (typeof window.ethereum !== 'undefined') {
        const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' })
        const ethProvider = new ethers.providers.Web3Provider(window.ethereum, 'any')

        setAccountAddress(account)
        setProvider(ethProvider)
      }
    }
    init()
  }, [])

  React.useEffect(() => {
    const checkNetwork = (newNetwork, oldNetwork) => {
      // When a Provider makes its initial connection, it emits a "network"
      // event with a null oldNetwork along with the newNetwork. So, if the
      // oldNetwork exists, it represents a changing network
      if (oldNetwork) {
        window.location.reload()
      }
    }

    const setMetadata = async () => {
      const signer = provider.getSigner()
      const network = await provider.getNetwork()
      const myAddress = await signer.getAddress()
      setNetworkName(network.name)
      setIsMainnet(network.name === 'homestead')

      if (ALLOWED_NETWORK.includes(network.name)) {
        try {
          const bankContract = new ethers.Contract(ERC20_CONTRACTS.bank, ERC20Upgradable, provider)
          const upBankContract = new ethers.Contract(ERC20_CONTRACTS.upBank, ERC20Upgradable, provider)
          const bankBalance = await bankContract.balanceOf(myAddress)
          const upBankBalance = await upBankContract.balanceOf(myAddress)
          setBankTokenAmount(bankBalance)
          setUpBankTokenAmount(upBankBalance)
        } catch (error) {
          console.log('Error: ', error)
        }
      }
    }

    if (provider) {
      // force refresh page on network change
      provider.on('network', checkNetwork)

      setMetadata()

      return () => {
        provider.off('block', checkNetwork)
      }
    }
  }, [provider])

  const connectToMetamask = async () => {
    // @ts-ignore
    if (typeof window.ethereum !== 'undefined') {
      // @ts-ignore
      const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' })
      // @ts-ignore
      const ethProvider = new ethers.providers.Web3Provider(window.ethereum)

      setProvider(ethProvider)
      setAccountAddress(account)
    }
  }

  const disconnectFromWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      await provider.close()
    }
  }

  return {
    connectToMetamask,
    disconnectFromWallet,
    accountAddress,
    bankTokenAmount,
    upBankTokenAmount,
    networkName,
    isMainnet,
  }
}
