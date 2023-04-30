import { NextUIProvider } from '@nextui-org/react';
import { AppProps } from 'next/app';
import globalStyles, { baseTheme } from '../styles/globalStyles';

function MyApp({ Component, pageProps }: AppProps) {
  globalStyles();

  return (
    <NextUIProvider theme={baseTheme}>
      <Component {...pageProps} />
    </NextUIProvider>
  );
}

export default MyApp;
