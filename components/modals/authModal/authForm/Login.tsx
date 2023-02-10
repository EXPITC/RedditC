import { ChangeEvent, FormEvent, useState } from 'react'
import { Box, Button, Flex, Input, Text } from "@chakra-ui/react"
import { useSetRecoilState } from 'recoil'
import { authModalState } from '@/libs/atoms/authModalAtoms'
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth'
import FirebaseErrMsg from '@/libs/firebase/errors'
import { auth } from '@/libs/firebase/clientApp'


export default function Login() {
  const setAuthModal = useSetRecoilState(authModalState)
  const [signInWithEmailAndPassword, _user, loading, error] = useSignInWithEmailAndPassword(auth)
  const [form, setForm] = useState({
    email: '',
    password: ''
  })

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    signInWithEmailAndPassword(form.email, form.password)

  }
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))

  }
  return (
    <form onSubmit={onSubmit}>
      <Input type="email"
        name="email" placeholder="Email"
        mb="2" onChange={onChange}
        required
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
      <Input type="password"
        name="password" placeholder="Password"
        mb="2" onChange={onChange}
        required
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
      <Button w="full" type="submit" isLoading={loading}>Login</Button>
      {error &&
        <Text fontSize="9pt" color="red" textAlign="center" mt="2">{FirebaseErrMsg[error.message as keyof typeof FirebaseErrMsg] || error.message.split('/')[1].split(')')[0].replace('-', ' ')}</Text>
      }
      <Box fontSize="9pt" my="2">
        <Flex justify="center">
          <Text mr="1">Forget your</Text>
          <Text color="purple.500"
            cursor="pointer" fontWeight="700"
            onClick={() => { }}>password ?</Text>
        </Flex>
        <Flex justify="center">
          <Text mr="1">New here?</Text>
          <Text color="purple.500"
            cursor="pointer" fontWeight="700"
            onClick={() => setAuthModal({ open: true, view: 'Sign Up' })}>SIGN UP</Text>
        </Flex>
      </Box>
    </form>
  )
}
