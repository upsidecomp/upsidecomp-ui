import nookies, { destroyCookie } from 'nookies'

export const SELECTED_WALLET_KEY = 'upside.selectedWallet'

export function getSelectedWallet(): string {
  return nookies.get()[SELECTED_WALLET_KEY]
}

export function setSelectedWallet(walletName: string) {
  nookies.set(null, SELECTED_WALLET_KEY, walletName, {
    maxAge: 7 * 24 * 60 * 60,
    path: '/',
  })
}

export function removeSelectedWallet() {
  destroyCookie(null, SELECTED_WALLET_KEY)
}
