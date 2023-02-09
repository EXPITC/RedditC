import { extendTheme, ThemeConfig } from "@chakra-ui/react";
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

const components = {
  Button: {
    // variant: {
    //   ""
    // }
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
