import { authModalState } from "@/libs/atoms/authModalAtoms";
import { Button } from "@chakra-ui/react";
import { useSetRecoilState } from "recoil";



export default function AuthButtons() {
  const setAuthModalState = useSetRecoilState(authModalState)

  return (
    <>
      <Button variant="outline"
        width={['70px', '110px']} height='28px' mr='2'
        display={['none', 'none', 'flex']}
        onClick={() => setAuthModalState({ open: true, view: 'Login' })}
      >Log In</Button>
      <Button
        width={['70px', '110px']} height='28px' mr='2'
        display={['none', 'none', 'flex']}
        onClick={() => setAuthModalState({ open: true, view: 'Sign Up' })}
      >Sign Up</Button>
    </>
  )
}
