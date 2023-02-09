import AuthModal from '@/components/modals/authModal'
import { Flex } from '@chakra-ui/react'
import AuthButtons from './oAuthContent/authButton'


export default function OAuthContent() {

  return (
    <>
      <AuthModal />
      <Flex justify="center" align="center">
        <AuthButtons />
      </Flex>
    </>
  )
}
