import useCommunityMenu from '@/libs/hooks/useCommunityMenu'
import {
  Menu,
  Text,
  MenuButton,
  Button,
  MenuList,
  Flex,
  Icon
} from '@chakra-ui/react'
import Image from 'next/image'
import { BsChevronDown } from 'react-icons/bs'
import CommunityListItem from './communityHome/communityListItem'

export default function ComunityHome() {
  const { communityMenu, toggleCommunityMenu } = useCommunityMenu()
  return (
    <Menu isOpen={communityMenu.isOpen} >
      <MenuButton
        as={Button}
        onClick={toggleCommunityMenu}
        variant="icon"
        fontSize="10pt"
        color="black"
        px={[0, '10px', '15px']}
        maxW={["188px", "218px", "268px"]}
        flexGrow="1"
        borderColor="transparent"
        h="40px"
        _hover={{ borderColor: 'gray.200' }}

      >
        <Flex
          align="center"
          justify={['center', 'center', 'space-between']}
        // maxW="200px"
        >
          <Flex align="center">

            {communityMenu.currentMenuItem.imageUrl ?
              <Image src={communityMenu.currentMenuItem.imageUrl} width={20} height={20} alt="community profile" style={{ borderRadius: "50%" }} />
              :
              <Icon fontSize="15pt" as={communityMenu.currentMenuItem.icon} color={communityMenu.currentMenuItem.iconColor} />
            }
            {/* <AiFillHome fontSize="15pt" /> */}
            <Text mx={[0, 1, 2]} display={['none', 'none', 'block']}>
              {communityMenu.currentMenuItem.displayText !== 'Home' && 'r/'}
              {communityMenu.currentMenuItem.displayText}
            </Text>
          </Flex>

          <BsChevronDown fontSize="10pt" />
        </Flex>
      </MenuButton>
      <MenuList w={["188px", "218px", "268px"]} >
        <CommunityListItem />
      </MenuList>
    </Menu>
  )
}
