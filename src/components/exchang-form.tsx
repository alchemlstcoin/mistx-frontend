import { Button, IconButton } from '@chakra-ui/button';
import {
  FormControl,
  FormHelperText,
  FormLabel,
} from '@chakra-ui/form-control';
import { Input, InputGroup, InputRightElement } from '@chakra-ui/input';
import { Box, Container, Flex, Heading, HStack } from '@chakra-ui/layout';
import { HiOutlineSwitchVertical } from 'react-icons/hi';
import { useState } from 'react';
import { useWallet } from '../context/wallet';

function ExchangeForm() {
  const { loading, onboard, wallet, ethBalance, mistBalance } = useWallet();
  const [from, setFrom] = useState({ token: 'mist', amount: '', icon: '⚗️' });
  const [to, setTo] = useState({ token: 'eth', amount: '', icon: '⧫' });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert('Submit order');
  };

  const handleSwitch = () => {
    const currentFrom = { ...from };
    const currentTo = { ...to };

    setFrom(currentTo);
    setTo(currentFrom);
  };

  const isValid = () => {
    return true;
  };

  const handleConnect = async () => {
    onboard?.walletSelect().then((selected) => {
      selected && onboard?.walletCheck();
    });
  };

  const handleSetMax = async () => {
    const isEth = from.token === 'eth';

    setFrom((currentFrom) => ({
      ...currentFrom,
      amount: isEth
        ? ethBalance?.toString() || '0.0'
        : mistBalance?.toString() || '0.0',
    }));
  };

  return (
    <Container maxW='lg'>
      <Box bg='gray.700' p={8} borderRadius={24} boxShadow='3xl'>
        <Heading size='lg' mb={4} textAlign='center'>
          Exchange
        </Heading>
        <form onSubmit={handleSubmit}>
          <FormControl id='from' isDisabled={!wallet}>
            <FormLabel>From</FormLabel>
            <InputGroup>
              <Input
                size='lg'
                pr='10rem'
                type='number'
                placeholder='0.0'
                variant='filled'
                value={from.amount}
                onChange={(e) =>
                  setFrom((prev) => ({ ...prev, amount: e.target.value }))
                }
              />
              <InputRightElement height='100%' width='10rem'>
                <HStack alignItems='center'>
                  <Button
                    size='sm'
                    variant='outline'
                    onClick={handleSetMax}
                    disabled={!wallet}
                  >
                    Max
                  </Button>
                  <Button size='sm' background='gray.600' disabled={!wallet}>
                    {from.icon} {from.token}
                  </Button>
                </HStack>
              </InputRightElement>
            </InputGroup>
            <FormHelperText>Minimum quantity: 0.2</FormHelperText>
          </FormControl>

          <Flex my={-3} justifyContent='flex-end'>
            <IconButton
              isRound
              variant='ghost'
              aria-label='Switch'
              onClick={handleSwitch}
              icon={<HiOutlineSwitchVertical />}
            />
          </Flex>

          <FormControl id='to' mb={4} isDisabled={!wallet}>
            <FormLabel>To</FormLabel>
            <InputGroup>
              <Input
                size='lg'
                pr='4rem'
                type='number'
                placeholder='0.0'
                variant='filled'
                value={to.amount}
                onChange={(e) =>
                  setTo((prev) => ({ ...prev, amount: e.target.value }))
                }
              />
              <InputRightElement height='100%' width='fit-content' mr={2}>
                <HStack alignItems='center'>
                  <Button size='sm' background='gray.600' disabled={!wallet}>
                    {to.icon} {to.token}
                  </Button>
                </HStack>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          {wallet ? (
            <Button
              isFullWidth
              size='lg'
              colorScheme='brand'
              disabled={!isValid()}
              type='submit'
            >
              Exchange
            </Button>
          ) : (
            <Button
              isFullWidth
              size='lg'
              colorScheme='brand'
              onClick={handleConnect}
              isLoading={loading}
            >
              Connect wallet
            </Button>
          )}
        </form>
      </Box>
    </Container>
  );
}

export default ExchangeForm;
