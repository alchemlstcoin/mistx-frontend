import Onboard from 'bnc-onboard';
import Notify, { API as NotifyAPI } from 'bnc-notify';
import { API as OnboardAPI, Wallet } from 'bnc-onboard/dist/src/interfaces';
import { Dispatch, SetStateAction } from 'react';
import { Network } from '../types';
import { config } from '../config';

type Subscriptions = {
  address: Dispatch<SetStateAction<string | undefined>>;
  network: Dispatch<SetStateAction<Network | undefined>>;
  balance: (balance: string) => void;
  wallet: (wallet: Wallet) => void;
};

const { dappId, networkId, rpcUrl, appName } = config;

export function initOnboard(subscriptions: Subscriptions): OnboardAPI {
  return Onboard({
    dappId,
    networkId,
    darkMode: true,
    subscriptions,
    walletSelect: {
      wallets: [
        { walletName: 'metamask', preferred: true },
        { walletName: 'trust', preferred: true },
        { walletName: 'authereum', preferred: true },
        { walletName: 'coinbase', preferred: true },
        {
          walletName: 'walletConnect',
          infuraKey: 'd5e29c9b9a9d4116a7348113f57770a8',
          preferred: true,
        },
        {
          walletName: 'portis',
          label: 'Portis',
          apiKey: 'e86e917b-b682-4a5c-bbc5-0f8c3b787562',
          preferred: true,
        },
        { walletName: 'opera' },
        { walletName: 'torus' },
        { walletName: 'status' },
        { walletName: 'walletLink', appName, rpcUrl },
        { walletName: 'frame' },
        { walletName: 'operaTouch' },
        { walletName: 'imToken', rpcUrl },
        { walletName: 'meetone' },
        { walletName: 'mykey', rpcUrl },
        { walletName: 'wallet.io', rpcUrl },
        { walletName: 'huobiwallet', rpcUrl },
        { walletName: 'hyperpay' },
        { walletName: 'atoken' },
        { walletName: 'liquality' },
      ],
    },
    walletCheck: [
      { checkName: 'derivationPath' },
      { checkName: 'connect' },
      { checkName: 'accounts' },
      { checkName: 'network' },
    ],
  });
}

export function initNotify(): NotifyAPI {
  return Notify({
    dappId,
    networkId,
  });
}
