import * as DialogRadix from '@radix-ui/react-dialog';
import { styled } from '../../styles/stitches.config';

export const ModalTitle = styled(DialogRadix.Title, {
  margin: 0,
  marginTop: '-10px',
  fontWeight: 600,
  color: '$primary800',
  fontSize: 20,
});
