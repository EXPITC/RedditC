import { Flex } from "@chakra-ui/react"
import Logo from "./navbar/logo"
import RightContents from "./navbar/rightContents"
import SearchInput from "./navbar/searchInput"

export default function Navbar() {

  return (
    <nav>
      <Flex bg="white" h="47px" p="3px 20px" align="center" justifyContent="center">
        <Logo />

        {/* <Directory /> */}
        <SearchInput />

        <RightContents />
      </Flex>
    </nav>
  )
}
