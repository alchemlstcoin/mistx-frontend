import 'focus-visible/dist/focus-visible';

import theme from './theme';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ChakraProvider } from '@chakra-ui/react';
import { WalletProvider } from './context/wallet';
import { GlobalStyles } from './theme/global-css';
import { Global } from '@emotion/react';

ReactDOM.render(
  <React.StrictMode>
    <WalletProvider>
      <ChakraProvider theme={theme}>
        <Global styles={GlobalStyles} />
        <App />
      </ChakraProvider>
    </WalletProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
