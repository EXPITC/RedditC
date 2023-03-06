import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { Box, Button, Flex, Input, Text } from '@chakra-ui/react'
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil'
import { authModalState } from '@/libs/atoms/authModalAtoms'
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth'
import FirebaseErrMsg from '@/libs/firebase/errors'
import { auth } from '@/libs/firebase/clientApp'
import { postState } from '@/libs/atoms/postsAtom'
import { communitySubsState } from '@/libs/atoms/communitiesAtoms'

export default function Login() {
  const setAuthModal = useSetRecoilState(authModalState)
  const resetPostState = useResetRecoilState(postState)
  const currentCommunity = useRecoilValue(communitySubsState).currentCommunity.id
  const [signInWithEmailAndPassword, _user, loading, error] =
    useSignInWithEmailAndPassword(auth)
  const [form, setForm] = useState({
    email: '',
    password: ''
  })
  const [err, setErr] = useState('')
  const [attempt, setAttempt] = useState(false)

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (err) setErr('')

    await signInWithEmailAndPassword(form.email, form.password)
    setAttempt(true)
  }
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  useEffect(() => {

    if (error) setErr(
      FirebaseErrMsg[error.message as keyof typeof FirebaseErrMsg] ||
      error.message.split('/')[1].split(')')[0].replace('-', ' ')
    )
    // console.log(attempt, !error, currentCommunity, !currentCommunity)
    if (attempt && !error && !currentCommunity) resetPostState()
    if (attempt) setAttempt(false)
  }, [error, attempt, currentCommunity])

  return (
    <form onSubmit={onSubmit}>
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
      <Button w="full" type="submit" isLoading={loading}>
        Login
      </Button>
      {err && (
        <Text fontSize="9pt" color="red" textAlign="center" mt="2">
          {err}
        </Text>
      )}
      <Box fontSize="9pt" my="2">
        <Flex justify="center">
          <Text mr="1">Forget your</Text>
          <Text
            color="purple.500"
            cursor="pointer"
            fontWeight="700"
            onClick={() => setAuthModal({ open: true, view: 'Reset Password' })}
          >
            password ?
          </Text>
        </Flex>
        <Flex justify="center">
          <Text mr="1">New here?</Text>
          <Text
            color="purple.500"
            cursor="pointer"
            fontWeight="700"
            onClick={() => setAuthModal({ open: true, view: 'Sign Up' })}
          >
            SIGN UP
          </Text>
        </Flex>
      </Box>
    </form>
  )
}
