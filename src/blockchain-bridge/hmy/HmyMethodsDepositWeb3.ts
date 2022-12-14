import { mulDecimals } from '../../utils';
import Web3 from 'web3';
import { Contract } from 'web3-eth-contract';
import { getAddress } from '@harmony-js/crypto';
const BN = require('bn.js');

interface IHmyMethodsInitParams {
  web3: Web3;
  hmyManagerContract: Contract;
  options?: { gasPrice: number; gasLimit: number };
}

export class HmyMethodsDepositWeb3 {
  private web3: Web3;
  private hmyManagerContract: Contract;
  // private options = { gasPrice: 3000000000, gasLimit: 6721900 };

  constructor(params: IHmyMethodsInitParams) {
    this.web3 = params.web3;
    this.hmyManagerContract = params.hmyManagerContract;

    // if (params.options) {
    //   this.options = params.options;
    // }
  }

  deposit = async (amount, sendTxCallback?) => {
    // @ts-ignore
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

    let res = await this.hmyManagerContract.methods
      .deposit(mulDecimals(amount, 18))
      .send({
        from: accounts[0],
        gasLimit: process.env.GAS_LIMIT,
        gasPrice: Number(process.env.GAS_PRICE),
        value: mulDecimals(amount, 18),
      })
      .on('transactionHash', sendTxCallback);

    return res;
  };
}
