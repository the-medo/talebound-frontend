import { NextUIProvider } from '@nextui-org/react';
import { AppProps } from 'next/app';
import globalStyles, { baseTheme } from '../styles/globalStyles';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { StoreProvider } from '../store';

const queryClient = new QueryClient();
axios.defaults.withCredentials = true;

function MyApp({ Component, pageProps }: AppProps) {
  globalStyles();

  return (
    <StoreProvider>
      <QueryClientProvider client={queryClient}>
        <NextUIProvider theme={baseTheme}>
          <Component {...pageProps} />
        </NextUIProvider>
      </QueryClientProvider>
    </StoreProvider>
  );
}

export default MyApp;
