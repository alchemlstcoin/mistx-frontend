import { Box, Flex } from '@chakra-ui/layout';
import ExchangeForm from './components/exchang-form';
import Header from './components/header';

function App() {
  return (
    <Flex minH='100vh' flexDir='column'>
      <Header />
      <Box mt={16}>
        <ExchangeForm />
      </Box>
    </Flex>
  );
}

export default App;
