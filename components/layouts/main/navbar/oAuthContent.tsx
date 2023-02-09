import { Flex } from '@chakra-ui/react'
import AuthButtons from './oAuthContent/authButton'


export default function OAuthContent() {

  return (
    <>
      {/* <Modal /> */}
      <Flex justify="center" align="center">
        <AuthButtons />
      </Flex>
    </>
  )
}
