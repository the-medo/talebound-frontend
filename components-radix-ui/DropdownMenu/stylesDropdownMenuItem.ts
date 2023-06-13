import { mauve, teal, tomato, olive } from '@radix-ui/colors';

export const stylesDropdownMenuItem = {
  all: 'unset',
  fontSize: 16,
  lineHeight: 1,
  borderRadius: 3,
  display: 'flex',
  alignItems: 'center',
  height: 36,
  padding: '0 5px',
  position: 'relative',
  paddingLeft: 25,
  userSelect: 'none',

  variants: {
    color: {
      default: {
        color: mauve.mauve11,

        '&[data-highlighted]': {
          backgroundColor: olive.olive3,
          color: olive.olive9,
        },
      },
      primary: {
        color: teal.teal11,

        '&[data-highlighted]': {
          backgroundColor: teal.teal9,
          color: teal.teal1,
        },
      },
      danger: {
        color: tomato.tomato11,

        '&[data-highlighted]': {
          backgroundColor: tomato.tomato9,
          color: tomato.tomato1,
        },
      },
    },
  },

  defaultVariants: {
    color: 'default',
  },

  '&[data-disabled]': {
    color: mauve.mauve8,
    pointerEvents: 'none',
  },
};
