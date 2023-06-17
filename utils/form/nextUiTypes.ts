import { CSSProperties } from '@stitches/react';

export type HelperType = {
  text: string;
  color?: CSSProperties['color'];
};

export const helperOK: HelperType = {
  text: '',
  color: undefined,
};
