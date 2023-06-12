import React, { ComponentType } from 'react';
import globalStyles, { baseTheme } from '../styles/globalStyles';
import { NextUIProvider } from '@nextui-org/react';
import { StoreProvider } from '../store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

type StorybookDecorator = (Story: ComponentType) => React.JSX.Element;

const queryClient = new QueryClient();

export const decorators: StorybookDecorator[] = [
  // eslint-disable-next-line @typescript-eslint/naming-convention
  (Story: ComponentType): React.JSX.Element => {
    globalStyles();

    return (
      <NextUIProvider theme={baseTheme}>
        <StoreProvider>
          <QueryClientProvider client={queryClient}>
            <Story />
          </QueryClientProvider>
        </StoreProvider>
      </NextUIProvider>
    );
  },
];
