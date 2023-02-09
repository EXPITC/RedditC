import { ChangeEvent, useState } from 'react'
import { Button, Flex, Input, Text } from "@chakra-ui/react"
import { useSetRecoilState } from 'recoil'
import { authModalState } from '@/libs/atoms/authModalAtoms'



export default function Login() {
  const setAuthModal = useSetRecoilState(authModalState)
  const [form, setForm] = useState({
    email: '',
    password: ''
  })
  const [confirmPassword, setConfirmPass] = useState('')


  const onSubmit = (e) => {

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
      <Input type="password"
        name="confirmPassword" placeholder="Confirm Password"
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
      <Button w="full" type="submit">Continue</Button>
      <Flex fontSize="9pt" my="2" justifyContent="center">
        <Text mr="1">Already a redditor?</Text>
        <Text color="purple.500"
          cursor="pointer" fontWeight="700"
          onClick={() => setAuthModal({ open: true, view: 'Login' })}>LOGIN</Text>
      </Flex>
    </form>
  )
}
