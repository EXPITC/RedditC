import AuthModal from '@/components/modals/authModal'
import { Flex } from '@chakra-ui/react'
import AuthButtons from './rightContents/authButton'


export default function rightContents() {

  return (
    <>
      <AuthModal />
      <Flex justify="center" align="center">
        <AuthButtons />
      </Flex>
    </>
  )
}
