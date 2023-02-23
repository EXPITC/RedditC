import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { Button, Flex, Input, Text } from '@chakra-ui/react'
import { useSetRecoilState } from 'recoil'
import { authModalState } from '@/libs/atoms/authModalAtoms'
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth'
import { auth } from '@/libs/firebase/clientApp'
import FirebaseErrMsg from '@/libs/firebase/errors'
import storeAccToFirestore from '@/libs/firebase/storeAccToFirestore'

export default function Login() {
  const setAuthModal = useSetRecoilState(authModalState)
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth)
  const [form, setForm] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  })
  // Just Checking math password when confirm password have value
  const passMatch = form.confirmPassword
    ? form.confirmPassword === form.password
    : true

  const [err, setErr] = useState('')

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (err) setErr('')

    if (!passMatch) return setErr('Password do not match')
    await createUserWithEmailAndPassword(form.email, form.password)
    if (error)
      setErr(
        FirebaseErrMsg[error.message as keyof typeof FirebaseErrMsg] ||
          error.message.split('/')[1].split(')')[0].replace('-', ' ')
      )
  }

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  useEffect(() => {
    if (user) storeAccToFirestore(user.user)
  }, [user])

  return (
    <form onSubmit={onSubmit} method="post">
      <Input
        type="email"
        name="email"
        placeholder="Email"
        mb="2"
        onChange={onChange}
        required
        bg="gray.50"
        fontSize="10pt"
        _placeholder={{ color: 'gray.500', fontWeight: 'bold' }}
        _hover={{
          bg: 'white',
          border: '1px solid',
          borderColor: 'purple.500'
        }}
        _focus={{
          boxShadow: 'none',
          outline: 'none',
          borderColor: 'purple.500'
        }}
      />
      <Input
        type="password"
        name="password"
        placeholder="Password"
        mb="2"
        onChange={onChange}
        required
        bg="gray.50"
        fontSize="10pt"
        _placeholder={{ color: 'gray.500', fontWeight: 'bold' }}
        _hover={{
          bg: 'white',
          border: '1px solid',
          borderColor: 'purple.500'
        }}
        _focus={{
          boxShadow: 'none',
          outline: 'none',
          borderColor: 'purple.500'
        }}
      />
      <Input
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
        mb="2"
        onChange={onChange}
        required
        bg="gray.50"
        fontSize="10pt"
        borderColor={!passMatch ? 'red' : 'transparent'}
        _placeholder={{ color: 'gray.500', fontWeight: 'bold' }}
        _hover={{
          bg: 'white',
          border: '1px solid',
          borderColor: 'purple.500'
        }}
        _focus={{
          boxShadow: 'none',
          outline: 'none',
          borderColor: !passMatch ? 'red' : 'purple.500'
        }}
      />
      {err && (
        <Text
          textAlign="center"
          color="red"
          mb="2"
          fontWeight="500"
          fontSize="10pt"
        >
          {err}
        </Text>
      )}
      <Button w="full" type="submit" isLoading={loading}>
        Continue
      </Button>
      <Flex fontSize="9pt" my="2" justifyContent="center">
        <Text mr="1">Already a redditor?</Text>
        <Text
          color="purple.500"
          cursor="pointer"
          fontWeight="700"
          onClick={() => setAuthModal({ open: true, view: 'Login' })}
        >
          LOGIN
        </Text>
      </Flex>
    </form>
  )
}
