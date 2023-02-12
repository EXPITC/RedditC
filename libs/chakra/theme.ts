import { extendTheme, ThemeComponents, ThemeConfig } from "@chakra-ui/react";
// import { mode } from "@chakra-ui/theme-tools";
import { GlobalStyleProps } from "@chakra-ui/theme-tools/dist";
import "@fontsource/open-sans/300.css"
import "@fontsource/open-sans/400.css"
import "@fontsource/open-sans/500.css"
import "@fontsource/open-sans/600.css"
import "@fontsource/open-sans/700.css"


const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
}

interface stylesType {
  global: (props: GlobalStyleProps) => {};
}
const styles: stylesType = {
  global: (props) => ({
    body: {
      // bg: mode("#202023", "gray.200")(props),
      bg: "gray.200",
      fontWeight: 500,
      color: 'black'
    },
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
      },
      _hover: {
        bg: 'purple.50'
      },
      _active: {
        opacity: 0.5
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
        height: '40px',
        border: '1px solid',
        borderColor: 'gray.300',
        fontWeight: 600,
        _hover: {
          bg: 'gray.50'
        }
      },
      icon: {
        bg: 'transparent',
        h: "35px",
        padding: 'unset',
        fontSize: '20px',
        color: 'gray.500',
        border: "1px solid",
        borderColor: 'gray.100',
        paddingLeft: "15px",
        paddingRight: "15px",
        borderRadius: '3px',
        _hover: {
          bg: 'gray.50',
          borderColor: 'gray.200'
        }
      },
      iconList: {
        bg: 'transparent',
        padding: 'unset',
        fontSize: '20px',
        color: 'gray.500',
        borderRadius: '5px',
        _hover: {
          bg: 'gray.100',
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
