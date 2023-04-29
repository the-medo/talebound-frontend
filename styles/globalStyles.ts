import {createTheme, globalCss} from '@nextui-org/react';

const globalStyles = globalCss({
  '*': {
    boxSizing: 'border-box',
    margin: 0,
    padding: 0,
  },
  ':root': {
    fontSize: '16px',
  },
  'html': {
    backgroundImage: 'linear-gradient(to right top, #eafff9 0%, #fff2e8 100%)'
  },
  'body': {
    fontFamily: '$text',
  },
  'h1,h2,h3,h4,h5,h6': {
    fontFamily: '$heading',
  },
  'a': {
    textDecoration: 'none',
    color: '$primary',
  }
});

export const baseTheme = createTheme({
  type: "light", // it could be "light" or "dark"
  theme: {
    colors: {

      white100: '#FFFFFF',
      white200: '#FEFEFE',
      white300: '#FCFCFC',
      white400: '#FAFAFA',
      white500: '#F8F6F8',
      white600: '#EEEEEE',
      white700: '#EAEAEA',
      white800: '#E4E4E4',
      white900: '#E1E1E1',

      black: '#202729',
      white: '$white500',

      primary500: '#36866f',
      secondary500: '#78959a',
      tertiary500: '#5b6b82',

      secondary: '#78959a',
      tertiary: '#5b6b82',

      success500: '#45a359',
      danger500: '#f44336',
      info500: '#028FCC',
      warning500: '#c39321',

      transparent0: 'rgba(255, 255, 255, 0)',
      transparent10: 'rgba(255, 255, 255, 0.1)',
      transparent20: 'rgba(255, 255, 255, 0.2)',
      transparent30: 'rgba(255, 255, 255, 0.3)',
      transparent40: 'rgba(255, 255, 255, 0.4)',
      transparent50: 'rgba(255, 255, 255, 0.5)',
      transparent60: 'rgba(255, 255, 255, 0.6)',
      transparent70: 'rgba(255, 255, 255, 0.7)',
      transparent80: 'rgba(255, 255, 255, 0.8)',
      transparent90: 'rgba(255, 255, 255, 0.9)',
      transparent100: 'rgba(255, 255, 255, 1)',

      primary100: '#e7f6ec',
      primary200: '#c5d2ce',
      primary300: '#89ab9a',
      primary400: '#87bda8',
      primary600: '#277364',
      primary700: '#1B605A',
      primary800: '#114D4D',
      primary900: '#0A3A40',

      secondary100: '#EEF9F8',
      secondary200: '#DFF4F3',
      secondary300: '#C2E0E0',
      secondary400: '#A2C0C2',
      secondary600: '#577A84',
      secondary700: '#3C5F6E',
      secondary800: '#264559',
      secondary900: '#173249',

      tertiary100: '#E9F2F8',
      tertiary200: '#D5E4F2',
      tertiary300: '#B2C5D9',
      tertiary400: '#8B9DB4',
      tertiary600: '#42536F',
      tertiary700: '#2D3D5D',
      tertiary800: '#1D2A4B',
      tertiary900: '#111C3E',

      success100: '#E2FADD',
      success200: '#C1F5BD',
      success300: '#94E396',
      success400: '#71C77B',
      success600: '#328C4E',
      success700: '#227544',
      success800: '#165E3A',
      success900: '#0D4E33',

      info100: '#CAFAFC',
      info200: '#96EFF9',
      info300: '#61D7EF',
      info400: '#39B9E0',
      info600: '#016FAF',
      info700: '#015392',
      info800: '#003B76',
      info900: '#002A61',

      warning100: '#FCF4D2',
      warning200: '#F9E8A6',
      warning300: '#ECD176',
      warning400: '#DBB652',
      warning600: '#A77818',
      warning700: '#8C6010',
      warning800: '#71490A',
      warning900: '#5D3906',

      danger100: '#FEE6D6',
      danger200: '#FDC7AE',
      danger300: '#FBA186',
      danger400: '#F87D67',
      danger600: '#D12729',
      danger700: '#AF1B29',
      danger800: '#8D1127',
      danger900: '#750A26',

      // brand colors
      primaryLight: '$primary200',
      primaryLightHover: '$primary300',
      primaryLightActive: '$primary400',
      primaryLightContrast: '$primary600',
      primary: '$primary500', //#4ADE7B
      primaryBorder: '$primary500',
      primaryBorderHover: '$primary600',
      primarySolidHover: '$primary700',
      primarySolidContrast: '$white',
      primaryShadow: '$primary500',

      dark1: '#154039',
      dark2: '#14342F',
      dark3: '#2C554E',

      gradientDark: 'linear-gradient(to right top, $dark1 0%, $dark2 100%)',
      gradientVerticalSemitransparent: 'linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.4) 50%, rgba(255, 255, 255, 0.4) 75%, rgba(255, 255, 255, 0) 100%)',


      link: '$secondary700',
      link2: '$secondary300',
      // background: '#f6fcfa',
      background: 'transparent',
      foreground: '$black',
      background2: '#f1e8d8',

      // you can also create your own color
      myColor: '#ff4ecd'

      // ...  more colors
    },
    fonts: {
      decorative: 'Astloch, serif',
      heading: 'Gudea, sans-serif',
      text: 'Cambay, Arial, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
      sans: "$text",
    },
    fontSizes: {
      xs: '0.75rem', /* 12px */
      sm: '0.875rem', /* 14px */
      base: '1rem', /* 16px */
      md: '1rem', /* 16px */
      lg: '1.125rem', /* 18px */
      xl: '1.25rem', /* 20px */
      '2xl': '1.5rem', /* 24px */
      '3xl': '1.875rem', /* 30px */
      '4xl': '2.25rem', /* 36px */
      '5xl': '3rem', /* 48px */
      '6xl': '3.75rem', /* 60px */
      '7xl': '4.5rem', /* 72px */
      '8xl': '6rem', /* 96px */
      '9xl': '8rem', /* 128px */
    },
    fontWeights: {
      hairline: 100,
      thin: 200,
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
      black: 900
    },
    lineHeights: {
      xs: 1, /* 16px */
      sm: 1.25, /* 20px */
      base: 1.5, /* 24px */
      md: 1.5, /* 24px */
      lg: 1.75, /* 28px */
      xl: 1.75, /* 28px */
      '2xl': 2, /* 32px */
      '3xl': 2.25, /* 36px */
      '4xl': 2.5, /* 40px */
      '5xl': 1, /* 16px */
      '6xl': 1, /* 16px */
      '7xl': 1, /* 16px */
      '8xl': 1, /* 16px */
      '9xl': 1 /* 16px */
    },
    letterSpacings: {
      tighter: '-0.05em',
      tight: '-0.025em',
      normal: '0',
      wide: '0.025em',
      wider: '0.05em',
      widest: '0.1em'
    },
    radii: {
      xs: '2px',
      sm: '4px',
      md: '8px',
      base: '8px',
      lg: '12px', // preferred value by NextUI components
      xl: '16px',
      '2xl': '20px',
      '3xl': '24px',
      squared: '33%',
      rounded: '50%',
      pill: '9999px',
    },
    borderWeights: {
      light: '1px',
      normal: '2px',
      bold: '3px',
      extrabold: '4px',
      black: '5px'
    },
    space: {
      0: '0rem',
      xs: '0.25rem',
      sm: '0.5rem',
      md: '1rem',
      lg: '1.25rem',
      xl: '2rem',
      '2xl': '3rem',
      '3xl': '4rem',
      '4xl': '8rem',
      '5xl': '12rem',
      '6xl': '16rem',
      '7xl': '20rem',
      '8xl': '24rem',
      '9xl': '28rem',
      min: 'min-content',
      max: 'max-content',
      fit: 'fit-content',
      screen: '100vw',
      half: '50%',
      full: '100%',
      px: '1px',
      1: '0.125rem',
      2: '0.25rem',
      3: '0.375rem',
      4: '0.5rem',
      5: '0.625rem',
      6: '0.75rem',
      7: '0.875rem',
      8: '1rem',
      9: '1.25rem',
      10: '1.5rem',
      11: '1.75rem',
      12: '2rem',
      13: '2.25rem',
      14: '2.5rem',
      15: '2.75rem',
      16: '3rem',
      17: '3.5rem',
      18: '4rem',
      20: '5rem',
      24: '6rem',
      28: '7rem',
      32: '8rem',
      36: '9rem',
      40: '10rem',
      44: '11rem',
      48: '12rem',
      52: '13rem',
      56: '14rem',
      60: '15rem',
      64: '16rem',
      72: '18rem',
      80: '20rem',
      96: '24rem'
    },
    breakpoints: {
      '2xs': '550px',
      xs: '650px',
      sm: '960px',
      md: '1280px',
      lg: '1400px',
      xl: '1920px'
    },
    zIndices: {
      1: '100',
      2: '200',
      3: '300',
      4: '400',
      5: '500',
      10: '1000',
      max: '9999'
    },
    shadows: {
      xs: '0 2px 8px 1px rgb(104 112 118 / 0.07), 0 1px 1px -1px rgb(104 112 118 / 0.04)',
      sm: '0 2px 8px 2px rgb(104 112 118 / 0.07), 0 2px 4px -1px rgb(104 112 118 / 0.04)',
      md: '0 12px 20px 6px rgb(104 112 118 / 0.08)',
      lg: '0 12px 34px 6px rgb(104 112 118 / 0.18)',
      xl: '0 25px 65px 0px rgb(104 112 118 / 0.35)',
      focus: '0 0 10px rgba(0, 0, 0, 0.2), inset 0 0 1px rgba(255, 255, 255, 0.6)',
    },
    // to use along with css dropShadow utility
    dropShadows: {
      xs: 'drop-shadow(0 2px 4px rgb(104 112 118 / 0.07)) drop-shadow(0 1px 1px rgb(104 112 118 / 0.04))',
      sm: 'drop-shadow(0 2px 8px rgb(104 112 118 / 0.07)) drop-shadow(0 2px 4px rgb(104 112 118 / 0.04))',
      md: 'drop-shadow(0 4px 12px rgb(104 112 118 / 0.08)) drop-shadow(0 20px 8px rgb(104 112 118 / 0.04))',
      lg: 'drop-shadow(0 12px 24px rgb(104 112 118 / 0.15)) drop-shadow(0 12px 14px rgb(104 112 118 / 0.1))',
      xl: 'drop-shadow(0 25px 34px rgb(104 112 118 / 0.35))'
    },
  }
});


export default globalStyles;