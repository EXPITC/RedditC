import { authModalState } from "@/libs/atoms/authModalAtoms"
import { Flex } from "@chakra-ui/react"
import { useRecoilValue } from "recoil"
import Login from './authForm/Login'
import Signup from './authForm/Signup'



export default function AuthForm() {
  const modalState = useRecoilValue(authModalState)

  return (
    <Flex>
      {modalState.view === 'Login' ?
        <Login />
        :
        <Signup />
      }
      {/* <Signup /> */}
    </Flex>
  )
}
