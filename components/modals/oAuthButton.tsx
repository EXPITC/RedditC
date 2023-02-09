import { Button, Flex } from "@chakra-ui/react";
import Image from "next/image";


export default function OAuthButton() {

  return (
    <Flex direction="column" w="full">
      <Button mb="3" variant="oauth">
        <Image src="/images/googlelogo.png" height={20} width={20} alt="google" style={{ marginRight: "5px" }} />
        Continue with Google
      </Button>
      <Button variant="oauth">Other platform</Button>
    </Flex>
  )
}
