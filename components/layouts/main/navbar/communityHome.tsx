import { Menu, Text, MenuButton, MenuItem, Button, MenuList, Flex } from "@chakra-ui/react";
import { AiFillHome } from "react-icons/ai";
import { BsChevronDown } from "react-icons/bs";
import CommunityListItem from "./communityHome/communityListItem";



export default function ComunityHome() {

  return (
    <>
      <Menu>
        <MenuButton as={Button} variant="icon" fontSize="10pt" color="black" px={[0, '10px', '15px']} w='200px'>
          <Flex align="center" justify={['center', 'center', 'space-between']} max-w="200px">
            <Flex align="center">
              <AiFillHome fontSize="15pt" />
              <Text mx={[0, 1, 2]} display={['none', 'none', 'block']}>Home</Text>
            </Flex>
            <BsChevronDown fontSize="10pt" />
          </Flex>
        </MenuButton>
        <MenuList>
          <CommunityListItem />
        </MenuList>
      </Menu>
    </>
  )
}
