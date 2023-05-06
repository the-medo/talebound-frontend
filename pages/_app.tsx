import { NextUIProvider } from '@nextui-org/react';
import { AppProps } from 'next/app';
import globalStyles, { baseTheme } from '../styles/globalStyles';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { StoreProvider } from '../store';
import { CookiesProvider } from 'react-cookie';
import { HydrationProvider } from 'react-hydration-provider';

const queryClient = new QueryClient();
axios.defaults.withCredentials = true;

function MyApp({ Component, pageProps }: AppProps) {
  globalStyles();

  return (
    <HydrationProvider>
      <NextUIProvider theme={baseTheme}>
        <CookiesProvider>
          <StoreProvider>
            <QueryClientProvider client={queryClient}>
              <Component {...pageProps} />
            </QueryClientProvider>
          </StoreProvider>
        </CookiesProvider>
      </NextUIProvider>
    </HydrationProvider>
  );
}

export default MyApp;
