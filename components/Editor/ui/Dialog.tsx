import * as React from 'react';
import { ReactNode } from 'react';
import { styled } from '../../../styles/stitches.config';

type Props = Readonly<{
  'data-test-id'?: string;
  children: ReactNode;
}>;

const StyledDialogActions = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'right',
  marginTop: '20px',
});

export function DialogActions({ 'data-test-id': dataTestId, children }: Props): JSX.Element {
  return <StyledDialogActions data-test-id={dataTestId}>{children}</StyledDialogActions>;
}

export const DialogButtonList = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'right',
  marginTop: '20px',

  button: {
    marginBottom: '20px',
  },
});
