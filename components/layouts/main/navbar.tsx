import { auth } from '@/libs/firebase/clientApp'
import { Flex } from '@chakra-ui/react'
import { useAuthState } from 'react-firebase-hooks/auth'
import CommunityHome from './navbar/communityHome'
import Logo from './navbar/logo'
import RightContents from './navbar/rightContents'
import SearchInput from './navbar/searchInput'

export default function Navbar() {
  const [user, _loading, _error] = useAuthState(auth)

  return (
    <nav>
      <Flex
        bg="white"
        h="47px"
        p={['3px 2px', '3px 10px', '3px 13px']}
        align="center"
        justify="space-between"
      >
        <Logo />

        {user && <CommunityHome />}
        <SearchInput user={user} />

        <RightContents user={user} />
      </Flex>
    </nav>
  )
}
