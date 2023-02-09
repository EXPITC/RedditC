import { Flex } from "@chakra-ui/react"
import Logo from "./navbar/logo"

export default function Navbar() {

  return (
    <nav>
      <Flex bg="white" h="47px" p="6px 20px">
        <Logo />

        {/* <Directory /> */}
        {/* <SearchInput /> */}
        {/* <RightContent /> */}
      </Flex>
    </nav>
  )
}
