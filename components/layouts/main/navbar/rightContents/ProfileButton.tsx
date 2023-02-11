import { Button, Text, Menu, MenuButton, MenuList, Flex, Box } from '@chakra-ui/react'
import { IoPersonOutline } from 'react-icons/io5'
import { BsChevronDown } from 'react-icons/bs'
import ProfileItems from './profileButton/profileItems'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '@/libs/firebase/clientApp'
import Image from 'next/image'


export default function ProfileButton() {
  const [user, _loading, _error] = useAuthState(auth)

  return (
    <Menu>
      <MenuButton as={Button} variant="icon" >
        {user ?
          <Flex align="center" justify="space-between">
            <Flex>
              <Box >
                <Flex position="relative">
                  <Box position="relative" w="30px" h="30.9px" borderRadius="full" bg="blackAlpha.200" />
                  <Image style={{ position: 'absolute' }}
                    src="/images/redditProfileHead.png" width={90} height={90} alt="reddit profile" />
                </Flex>
              </Box>
              <Flex flexDirection="column" display={['none', 'none', 'none', 'flex']} justify="space-between" py="0.5" textAlign="left" >
                <Text fontSize="8pt">{user?.displayName || user.email?.split('@')[0]}</Text>
                <Text fontSize="7pt">This karma</Text>
              </Flex>
            </Flex>
            <Box ml={[0, 0, 0, '50px']} >
              <BsChevronDown fontSize="10pt" />
            </Box>
          </Flex>
          :
          <Flex align="center" >
            <IoPersonOutline style={{ marginRight: '4pt' }} />
            <BsChevronDown fontSize="10pt" />
          </Flex>
        }

      </MenuButton>
      <MenuList>
        <ProfileItems />
      </MenuList>
    </Menu >
  )
}
