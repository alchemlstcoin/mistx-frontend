import { extendTheme, ThemeConfig, theme } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

const customTheme = extendTheme({
  config,
  colors: {
    brand: {
      50: '#E7F3FE',
      100: '#BBDDFC',
      200: '#8FC7FA',
      300: '#63B1F8',
      400: '#379CF6',
      500: '#0B86F4',
      600: '#096BC3',
      700: '#075092',
      800: '#043662',
      900: '#021B31',
    },
  },
  fonts: {
    heading: 'Poppins',
    body: 'Poppins',
  },
  components: {
    Heading: {
      baseStyle: {
        fontWeight: 700,
      },
    },
    Button: {
      baseStyle: {
        fontWeight: 600,
        borderRadius: theme.radii['xl'],
      },
      variants: {
        solid: {
          bg: 'brand.500',
          color: 'white',
        },
        outline: {
          borderColor: 'brand.500',
          color: 'brand.500',
        },
      },
    },
  },
});

export default customTheme;
