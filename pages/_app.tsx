import { ChakraProvider } from '@chakra-ui/react'
import { AppProps } from 'next/app'
import { RecoilRoot } from 'recoil'
import Layout from '../components/layouts/main/main'
import theme from '../libs/chakra/theme'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <ChakraProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </RecoilRoot>
  )
}
