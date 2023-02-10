import { auth } from "@/libs/firebase/clientApp"
import { Flex } from "@chakra-ui/react"
import { useAuthState } from "react-firebase-hooks/auth"
import Logo from "./navbar/logo"
import RightContents from "./navbar/rightContents"
import SearchInput from "./navbar/searchInput"

export default function Navbar() {
  const [user, loading, error] = useAuthState(auth)

  return (
    <nav>
      <Flex bg="white" h="47px" p="3px 20px" align="center" justifyContent="center">
        <Logo />

        {/* <Directory /> */}
        <SearchInput />

        <RightContents user={user} />
      </Flex>
    </nav>
  )
}
