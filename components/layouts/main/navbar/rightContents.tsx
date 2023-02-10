import AuthModal from '@/components/modals/authModal'
import { Flex } from '@chakra-ui/react'
import { User } from 'firebase/auth'
import AuthButtons from './rightContents/authButton'

interface props {
  user: User | undefined | null
}

export default function rightContents({ user }: props) {

  return (
    <>
      <AuthModal />
      <Flex justify="center" align="center">
        {user ? <></> : <AuthButtons />}
      </Flex>
    </>
  )
}
