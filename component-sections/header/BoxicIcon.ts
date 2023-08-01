import { styled } from '../../styles/stitches.config';

const ICON_SIZE = 25;
const PADDING_SIZE = 3;
const MENU_HEIGHT = 50;

export const BoxikIcon = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  position: 'absolute',

  alignItems: 'center',
  justifyContent: 'center',

  transition: 'all 0.2s ease-in-out',

  width: `${ICON_SIZE}px`,
  height: `${ICON_SIZE}px`,

  variants: {
    x: {
      left: {
        left: `${PADDING_SIZE}px`,
      },
      right: {
        right: `${PADDING_SIZE}px`,
      },
    },
    y: {
      top: {
        top: `${MENU_HEIGHT + PADDING_SIZE}px`,
      },
      bottom: {
        bottom: `${PADDING_SIZE}px`,
      },
    },
  },
});
