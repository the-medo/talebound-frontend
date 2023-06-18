import { InputProps } from '../../components/Input/Input';

export type HelperType = {
  text: string;
  type?: InputProps['helperType'];
};

export const helperOK: HelperType = {
  text: '',
  type: undefined,
};
