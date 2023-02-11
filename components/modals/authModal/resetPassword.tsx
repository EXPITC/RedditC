import { authModalState } from "@/libs/atoms/authModalAtoms"
import { auth } from "@/libs/firebase/clientApp"
import { Button, Flex, Input, Text, Box, Heading } from "@chakra-ui/react"
import { FormEvent, useState } from "react"
import Image from 'next/image'
import { useSendPasswordResetEmail } from "react-firebase-hooks/auth"
import { useSetRecoilState } from "recoil"



export default function ResetPassword() {
  const setAuthModal = useSetRecoilState(authModalState)
  const [email, setEmail] = useState('')
  const [success, setSuccess] = useState(false)
  const [sendEmail, sending, error] = useSendPasswordResetEmail(auth)

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await sendEmail(email)
    setSuccess(true)
  }
  return (
    <Box py="10">
      {success ?
        <Flex justify="center" align="center">
          <Image src="/images/redditFace.svg" width={50} height={50} alt="reddit logo" />
          <Text ml="3" fontSize="12pt" fontWeight="semibold" >Please Check Your Email ;)</Text>
        </Flex>
        :
        <>
          <Heading as="h3" fontSize="13pt" letterSpacing="wide" fontWeight="600" >Reset your password</Heading>
          <Text fontSize="9pt" textAlign="start" fontWeight="500" mt="2" >Tell us the email address associated with your Reddit account, and we’ll send you an email with a link to reset your password. </Text>
          <form onSubmit={onSubmit} method="post">
            <Input type="email"
              name="email" placeholder="Email"
              my="4" onChange={(e) => setEmail(e.target.value)} required
              bg="gray.50"
              fontSize="10pt"
              _placeholder={{ color: "gray.500", fontWeight: "bold" }}
              _hover={{
                bg: "white",
                border: "1px solid",
                borderColor: "purple.500"
              }}
              _focus={{
                boxShadow: "none",
                outline: "none",
                borderColor: "purple.500"
              }}
            />
            <Button w="full" type="submit" isDisabled={email.search('@') === -1} isLoading={sending} _hover={{}}>Send</Button>
          </form>
          {error &&
            <Text fontSize="9pt" color="red" textAlign="center" my="3">{FirebaseErrMsg[error.message as keyof typeof FirebaseErrMsg] || error.message.split('/')[1].split(')')[0].replace('-', ' ')}</Text>
          }
          <Flex fontSize="9pt" color="purple.500" fontWeight="bold" mt="10">
            <Text textDecoration="underline" cursor="pointer" onClick={() => setAuthModal({ open: true, view: 'Sign Up' })}>Sign Up</Text>
            <Text mx="1">•</Text>
            <Text textDecoration="underline" cursor="pointer" onClick={() => setAuthModal({ open: true, view: 'Login' })}>Log In</Text>
          </Flex>
        </>
      }
    </Box>
  )
}
