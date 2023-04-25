import {createTheme, globalCss} from '@nextui-org/react';

const globalStyles = globalCss({
  '*': {
    boxSizing: 'border-box',
    margin: 0,
    padding: 0,
  },
  'html': {
    backgroundImage: 'linear-gradient(to right top, #eafff9 0%, #fff2e8 100%)'
  },
  'body': {
    fontFamily: '$text',
  },
});

export const baseTheme = createTheme({
  type: "light", // it could be "light" or "dark"
  theme: {
    colors: {
      black: '#202729',
      white: '#F8F6F8',

      white100: '#FFFFFF',
      white200: '#FEFEFE',
      white300: '#FCFCFC',
      white400: '#FAFAFA',

      primary500: '#36866f',
      secondary500: '#78959a',
      tertiary500: '#5b6b82',

      success500: '#45a359',
      danger500: '#f44336',
      info500: '#028FCC',
      warning500: '#c39321',

      primary100: '#DBF8E4',
      primary200: '#B8F2D1',
      primary300: '#8CDAB4',
      primary400: '#64B696',
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


      link: '#5E1DAD',
      // background: '#f6fcfa',
      background: 'transparent',
      background2: '#f1e8d8',

      // you can also create your own color
      myColor: '#ff4ecd'

      // ...  more colors
    },
    space: {},
    fonts: {
      decorative: 'Astloch, serif',
      heading: 'Gudea, sans-serif',
      text: 'Cambay, Arial, sans-serif',
    }
  }
});


export default globalStyles;