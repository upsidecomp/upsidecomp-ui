import { ethers } from 'ethers'

export const parseNumString = (amount: any, units: number | string): ethers.BigNumber => {
  try {
    return ethers.utils.parseUnits(amount, units)
  } catch (e) {
    console.warn(e)
    return ethers.constants.Zero
  }
}
