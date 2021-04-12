import { ethers } from 'ethers';
import { config } from '../config';
import { Network } from '../types';
import { Wallet } from 'bnc-onboard/dist/src/interfaces';
import { initNotify, initOnboard } from '../services/wallet';
import IUniswapV2ERC20 from '../contracts/IUniswapV2ERC20.json';
import {
  createContext,
  ReactElement,
  useContext,
  useEffect,
  useState,
} from 'react';

type WalletProviderContext = {
  provider?: ethers.providers.Web3Provider;
  address?: string;
  network?: Network;
  ethBalance?: string;
  mistBalance?: string;
  wallet?: Wallet;
  loading?: boolean;
  onboard?: ReturnType<typeof initOnboard>;
  notify?: ReturnType<typeof initNotify>;
};

type WalletProviderProps = { children: ReactElement };

const WalletStateContext = createContext<WalletProviderContext | undefined>(
  undefined
);

function WalletProvider({ children }: WalletProviderProps): ReactElement {
  const [provider, setProvider] = useState<ethers.providers.Web3Provider>();
  const [address, setAddress] = useState<string>();
  const [network, setNetwork] = useState<Network>();
  const [ethBalance, setEthBalance] = useState<string>();
  const [mistBalance, setMistBalance] = useState<string>();
  const [wallet, setWallet] = useState<Wallet>();
  const [loading, setLoading] = useState<boolean>(true);
  const [onboard, setOnboard] = useState<ReturnType<typeof initOnboard>>();
  const [notify, setNotify] = useState<ReturnType<typeof initNotify>>();

  useEffect(() => {
    const onboard = initOnboard({
      address: setAddress,
      network: setNetwork,
      balance: (balance) => {
        if (balance) {
          setEthBalance(ethers.utils.formatEther(balance));
        }
      },
      wallet: (wallet: Wallet) => {
        if (wallet?.provider?.selectedAddress) {
          handleSetWallet(wallet);
          handleSetProvider(wallet);
          setLoading(false);
        } else {
          setProvider(undefined);
          setWallet(undefined);
          setEthBalance(undefined);
          setMistBalance(undefined);
          setLoading(false);
        }
      },
    });

    setOnboard(onboard);
    setNotify(initNotify());
  }, []);

  useEffect(() => {
    if (provider && address) {
      const contract = new ethers.Contract(
        config.mistAddress,
        IUniswapV2ERC20.abi,
        provider.getSigner()
      );

      contract.balanceOf(address).then((balance: string) => {
        setMistBalance(ethers.utils.formatEther(balance));
      });
    }
  }, [provider, address]);

  useEffect(() => {
    const previouslySelectedWallet = window.localStorage.getItem(
      'selectedWallet'
    );

    if (!previouslySelectedWallet) {
      setLoading(false);
    }

    if (previouslySelectedWallet && onboard) {
      onboard
        .walletSelect(previouslySelectedWallet)
        .then((selected) => selected && onboard.walletCheck());
    }
  }, [onboard]);

  const handleSetProvider = (wallet: Wallet) => {
    const ethersProvider = new ethers.providers.Web3Provider(wallet.provider);
    setProvider(ethersProvider);
  };

  const handleSetWallet = (wallet: Wallet) => {
    setWallet(wallet);
    window.localStorage.setItem('selectedWallet', wallet.name || '');
  };

  return (
    <WalletStateContext.Provider
      value={{
        provider,
        address,
        network,
        ethBalance,
        mistBalance,
        wallet,
        loading,
        onboard,
        notify,
      }}
    >
      {children}
    </WalletStateContext.Provider>
  );
}

function useWallet(): WalletProviderContext {
  const context = useContext(WalletStateContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
}

export { WalletProvider, useWallet };
