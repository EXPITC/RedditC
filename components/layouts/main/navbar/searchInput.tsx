import { Flex, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { SearchIcon } from '@chakra-ui/icons'
import { User } from "firebase/auth";

interface props {
  user: User | undefined | null
}

export default function SearchInput({ user }: props) {

  return (
    <Flex flexGrow="1" mr="2" maxW={user ? 'auto' : '640px'} h="34px" align="center">
      <InputGroup >
        <InputLeftElement
          pointerEvents="none"
          children={<SearchIcon color="blackAlpha.500" fontSize="14pt" />}
        />
        <Input type="text" fontSize="10pt"
          bg="gray.50" borderRadius="full"
          placeholder="Search Reddit" _placeholder={{ color: "gray.500" }}
          _focus={{ boxShadow: "none", outline: "none", borderColor: "purple.500" }} _hover={{ bg: 'white', border: "1px solid", borderColor: "purple.500" }} />
      </InputGroup>
    </Flex>

  )
}
