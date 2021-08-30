import { ethers } from 'ethers'
import { batch, contract } from '@pooltogether/etherplex'

import { POOL_ALIASES } from "../constant.ts"
import BanklessPrizePoolAbi from '@upsidecomp/upsidecomp-contracts-bankless-core/abis/BanklessPrizePool.json'
import ERC20Upgradeable from '@upsidecomp/upsidecomp-contracts-bankless-core/abis/ERC20Upgradeable.json'
import { useProvider } from "./useProvider";

export const usePrizePoolContracts = async () => {
  const provider = useProvider();

  const prizePoolAddress = POOL_ALIASES["bankless-test"].poolAddress;
  const prizePoolContract = contract('prizePool', BanklessPrizePoolAbi, prizePoolAddress);

  const prizePoolTokens = await batch(provider, prizePoolContract.tokens())
  const prizePoolToken = await batch(provider, prizePoolContract.token())

  console.log(prizePoolContract
    .tokens()
    .token()
  )

  const prizePoolTokensArray = await Promise.all(prizePoolTokens.prizePool.tokens[0].map(async (tokenAddress) => {
    const tokenContract = contract('ERC20', ERC20Upgradeable, tokenAddress);
    const symbol = await batch(provider, tokenContract.symbol())
    const decimals = await batch(provider, tokenContract.decimals())
    return {
      address: tokenAddress,
      symbol: symbol.ERC20.symbol[0],
      decimal: decimals.ERC20.decimals[0]
    }
  }));


  const tokenContract = contract('ERC20', ERC20Upgradeable, prizePoolToken.prizePool.token[0]);
  const symbol = await batch(provider, tokenContract.symbol())
  const decimals = await batch(provider, tokenContract.decimals())
  const prizePoolDepositToken = {
    address: prizePoolToken.prizePool.token[0],
    symbol: symbol.ERC20.symbol[0],
    decimal: decimals.ERC20.decimals[0]
  }

  return {
    prizePool: {
      address: POOL_ALIASES["bankless-test"].poolAddress,
      contract: prizePoolContract,
    },
    ticket: prizePoolTokensArray[0],
    sponsorship: prizePoolTokensArray[1],
    token: prizePoolTokensArray
  }
}
