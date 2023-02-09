import { ComponentStyleConfig, extendTheme, ThemeComponents, ThemeConfig } from "@chakra-ui/react";
import "@fontsource/open-sans/300.css"
import "@fontsource/open-sans/400.css"
import "@fontsource/open-sans/700.css"


const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: true,
};

const styles = {
  global: () => ({
    body: {
      bg: "gray.200",
      color: 'black'
    }
  })
}


const components: ThemeComponents = {
  Button: {

    baseStyle: {
      borderRadius: '60px',
      fontsize: '10pt',
      fontWeight: 700,
      _focus: {
        boxShadow: "none",
      }
    },

    sizes: {
      sm: {
        fontSize: '8pt'
      },
      md: {
        fontSize: '10pt'
      },
    },

    variants: {
      solid: {
        color: 'white',
        bg: 'purple.500',
        _hover: {
          bg: 'purple.400'
        },
        _active: {
          bg: 'purple.500'
        }
      },
      outline: {
        color: 'purple.500',
        border: '1px solid',
        borderColor: 'purple.500',
        _hover: {
          bg: 'purple.50'
        }
      },
      oauth: {
        height: '34px',
        border: '1px solid',
        borderRadius: 'gray.300',
        _hover: {
          bg: 'gray.50'
        }
      }
    }

  }
}

const colors = {
  brand: {
    100: "#FF1c00"
  }
}

const fonts = {
  body: "Open Sans, sans-serif"
}



const theme = extendTheme({
  config,
  styles,
  components,
  fonts,
  colors
})

export default theme
