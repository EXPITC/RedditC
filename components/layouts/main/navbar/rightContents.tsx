import AuthModal from '@/components/modals/authModal'
import { Stack } from '@chakra-ui/react'
import { User } from 'firebase/auth'
import AuthButtons from './rightContents/authButton'
import IconsDecoration from './rightContents/iconsDecoration'
import ProfileButton from './rightContents/ProfileButton'

interface props {
  user: User | undefined | null
}

export default function rightContents({ user }: props) {
  return (
    <Stack direction="row" justify="flex-end" align="center" >
      <AuthModal />
      {user ? <IconsDecoration /> : <AuthButtons />}
      <ProfileButton user={user} />
    </Stack>
  )
}
