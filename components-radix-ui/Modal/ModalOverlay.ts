import * as DialogRadix from '@radix-ui/react-dialog';
import { keyframes, styled } from '../../styles/stitches.config';

const overlayShow = keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 1 },
});

export const ModalOverlay = styled(DialogRadix.Overlay, {
  backgroundColor: 'rgba(0, 0, 0, .1)',
  position: 'fixed',
  inset: 0,
  animation: `${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
});
