import { NextUIProvider } from '@nextui-org/react';
import { AppProps } from 'next/app';
import globalStyles, { baseTheme } from '../styles/globalStyles';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import axios from 'axios';

const queryClient = new QueryClient();
axios.defaults.withCredentials = true;

function MyApp({ Component, pageProps }: AppProps) {
  globalStyles();

  return (
    <QueryClientProvider client={queryClient}>
      <NextUIProvider theme={baseTheme}>
        <Component {...pageProps} />
      </NextUIProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
