import { Button } from "@chakra-ui/react";



export default function AuthButtons() {

  return (
    <>
      <Button variant="outline"
        width={['70px', '110px']} height='28px' mr='2'
        display={['none', 'none', 'flex']}
        onClick={() => { }}
      >Log In</Button>
      <Button
        width={['70px', '110px']} height='28px' mr='2'
        display={['none', 'none', 'flex']}
        onClick={() => { }}
      >Sign Up</Button>
    </>
  )
}
