import { Box, Container } from "@chakra-ui/layout"
import Head from "next/head"
import Navbar from "./navbar"

interface props {
  children: React.ReactNode
}

export default function Main({ children }: props) {

  return (
    <>
      <Head>
        <title>Reddit C</title>
      </Head>

      <Box as="main">
        <Navbar />

        <Container>
          {children}
        </Container>

        {/* <Footer /> */}
      </Box>
    </>
  )
}
