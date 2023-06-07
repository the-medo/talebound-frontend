import React, { ComponentType } from 'react';
import globalStyles, { baseTheme } from '../styles/globalStyles';
import { NextUIProvider } from '@nextui-org/react';

type StorybookDecorator = (Story: ComponentType) => React.JSX.Element;

export const decorators: StorybookDecorator[] = [
  // eslint-disable-next-line @typescript-eslint/naming-convention
  (Story: ComponentType): React.JSX.Element => {
    globalStyles();

    return (
      <NextUIProvider theme={baseTheme}>
        <Story />
      </NextUIProvider>
    );
  },
];
