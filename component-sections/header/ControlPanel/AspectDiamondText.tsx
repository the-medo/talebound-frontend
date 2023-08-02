import { styled } from '../../../styles/stitches.config';
import { BIG_IMG_COEF, IMG_SIZE } from './utilsAspectDiamond';

export const AspectDiamondText = styled('span', {
  position: 'absolute',
  left: '50%',
  top: '50%',
  transform: ' translate(-50%, -50%) rotate(-45deg)',
  opacity: 0.9,

  '&:hover': {
    opacity: 1,
  },

  variants: {
    large: {
      true: {
        width: `${IMG_SIZE * BIG_IMG_COEF}px`,
        height: `${IMG_SIZE * BIG_IMG_COEF}px`,
      },
    },
  },
});
