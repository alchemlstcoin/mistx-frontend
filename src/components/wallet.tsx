import { Button } from '@chakra-ui/button';
import { Box, Flex, SimpleGrid, Text } from '@chakra-ui/layout';
import { useWallet } from '../context/wallet';
import { truncate } from '../utils';

function Wallet() {
  const { onboard, loading, address, wallet, ethBalance } = useWallet();

  const handleClick = async () => {
    onboard?.walletSelect().then((selected) => {
      selected && onboard?.walletCheck();
    });
  };

  return (
    <SimpleGrid
      columns={ethBalance ? 2 : 1}
      gridTemplateColumns={ethBalance ? 'auto 1fr' : '1fr'}
    >
      {ethBalance && (
        <Flex
          mr={-2}
          bg='gray.700'
          alignItems='center'
          borderTopLeftRadius={16}
          borderBottomLeftRadius={16}
        >
          <Box pl={3} pr={5}>
            <Text>
              <strong>{ethBalance}</strong> ETH
            </Text>
          </Box>
        </Flex>
      )}
      <Button
        colorScheme='brand'
        onClick={handleClick}
        loadingText='Connecting'
        isLoading={loading}
      >
        {wallet ? truncate(address) : 'Connect'}
      </Button>
    </SimpleGrid>
  );
}

export default Wallet;
