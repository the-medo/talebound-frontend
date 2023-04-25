import { globalCss } from '@nextui-org/react';

const globalStyles = globalCss({
  '*': {
    boxSizing: 'border-box',
    margin: 0,
    padding: 0,
  },
  'html': {
    backgroundImage: 'linear-gradient(to right top, #f6fcfa  0%, #f1e8d8  100%)'
  },
  'body': {
    fontFamily: 'Cambay, Arial, sans-serif',
  },
  'a': {
    textDecoration: 'none',
    color: 'inherit',
  },
});

export default globalStyles;