import { Button } from '@chakra-ui/button';
import { useWallet } from '../context/wallet';
import { truncate } from '../utils';

type Props = {
  connected: boolean;
};

function WalletButton({ connected }: Props) {
  const { onboard, loading, address } = useWallet();

  const handleClick = async () => {
    onboard?.walletSelect().then((selected) => {
      selected && onboard?.walletCheck();
    });
  };

  const isLoading = loading || (connected && !address);

  return (
    <Button
      mt={4}
      size='lg'
      colorScheme='brand'
      onClick={handleClick}
      isLoading={isLoading}
    >
      {connected ? truncate(address) : 'Connect'}
    </Button>
  );
}

export default WalletButton;
