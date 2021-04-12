import { Flex, Heading } from '@chakra-ui/layout';
import Wallet from './wallet';

function Header() {
  return (
    <Flex justifyContent='space-between' alignItems='center' p={4}>
      <Heading
        fontSize={['2xl', '4xl']}
        bgGradient='linear(to-r, #FF0080, #7928CA)'
        bgClip='text'
      >
        mistX
      </Heading>
      <Wallet />
    </Flex>
  );
}

export default Header;
