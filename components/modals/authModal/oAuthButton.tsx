import { communitySubsState } from '@/libs/atoms/communitiesAtoms'
import { postState } from '@/libs/atoms/postsAtom'
import { auth } from '@/libs/firebase/clientApp'
import FirebaseErrMsg from '@/libs/firebase/errors'
import storeAccToFirestore from '@/libs/firebase/storeAccToFirestore'
import { Button, Flex, Text } from '@chakra-ui/react'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import {
  useSignInWithApple,
  useSignInWithGoogle
} from 'react-firebase-hooks/auth'
import { useRecoilValue, useResetRecoilState } from 'recoil'

export default function OAuthButton() {
  const [signInWithGoogle, userGoogle, loadingGoogle, errorGoogle] =
    useSignInWithGoogle(auth)
  const [signInWithApple, userApple, loadingApple, errorApple] =
    useSignInWithApple(auth)
  const [err, setErr] = useState('')
  const resetPostState = useResetRecoilState(postState)
  const currentCommunity =
    useRecoilValue(communitySubsState).currentCommunity.id
  const [attempt, setAttempt] = useState(false)

  const handleClick = async (platform: 'google' | 'apple') => {
    if (err) setErr('')
    if (platform === 'google')
      return await signInWithGoogle().then(() => setAttempt(true))
    await signInWithApple().then(() => setAttempt(true))
  }

  useEffect(() => {
    let oAuthErr = errorGoogle?.message || errorApple?.message

    // This double check just to make sure
    if (oAuthErr) {
      oAuthErr =
        FirebaseErrMsg[oAuthErr as keyof typeof FirebaseErrMsg] ||
        oAuthErr.split('/')[1].split(')')[0].replace('-', ' ')
      setErr(oAuthErr)
    }
    if (attempt && !oAuthErr && !currentCommunity) resetPostState()
    if (attempt) setAttempt(false)
  }, [errorApple, errorGoogle, attempt, currentCommunity, resetPostState])

  useEffect(() => {
    const user = userApple || userGoogle

    if (user) storeAccToFirestore(user.user)
  }, [userApple, userGoogle])

  return (
    <Flex direction="column" w="full">
      <Button
        mb="3"
        variant="oauth"
        isLoading={loadingGoogle}
        onClick={() => handleClick('google')}
      >
        <Image
          src="/images/googlelogo.png"
          height={17}
          width={17}
          alt="google"
          style={{ left: '5%', position: 'absolute' }}
        />
        Continue with Google
      </Button>
      <Button
        variant="oauth"
        isLoading={loadingApple}
        onClick={() => handleClick('apple')}
      >
        <Image
          src="/images/applelogo.svg"
          height={15}
          width={15}
          alt="google"
          style={{ left: '5%', position: 'absolute' }}
        />
        Continue with Apple
      </Button>
      {err && (
        <Text color="red" fontSize="10pt" textAlign="center" mt="3">
          {err}
        </Text>
      )}
    </Flex>
  )
}
