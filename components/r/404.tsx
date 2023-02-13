import { Button, Flex, Text } from "@chakra-ui/react"
import Link from "next/link"



const PageR404 = () => (
  <Flex align="center" justify="center" h="85vh" w="100vw" mb="-200px" direction="column">
    <Text mb="4" textAlign="center" fontSize={['10pt', '14pt']}>Sorry, that community does not exist or has been banned</Text>
    <Button variant="solid" as={Link} href="/" px="7">
      Back Home
    </Button>
  </Flex>
)

export default PageR404
