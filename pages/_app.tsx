import '../styles/globals.scss'

import { WalletProvider } from '@hooks/useWallet'
import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <WalletProvider>
        <Component {...pageProps} />
      </WalletProvider>
    </QueryClientProvider>
  )
}
export default CustomApp
