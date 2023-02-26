import { authModalState } from '@/libs/atoms/authModalAtoms'
import { auth } from '@/libs/firebase/clientApp'
import { Box, Button, Flex, Input } from '@chakra-ui/react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useAuthState } from 'react-firebase-hooks/auth'
import { IoImageOutline } from 'react-icons/io5'
import { TfiLink } from 'react-icons/tfi'
import { useSetRecoilState } from 'recoil'

const ImageProfileHead = () => (
  <Box position="relative" w="75px" >
    <Box
      position="relative"
      borderRadius="0 0 50% 50%"
      overflow="hidden"
      top="-5px"
    >
      <Box
        bg="gray.300"
        w="40px"
        h="40px"
        position="absolute"
        bottom="-0.5px"
        left="calc(50% - 20px)"
        borderRadius="full"
      />
      <Image
        src="/images/redditProfileHead.png"
        width={50}
        height={50}
        alt="reddit profile head"
        style={{ position: 'relative', zIndex: 0 }}
      />
    </Box>
  </Box>
)

const LinkPost = () => {
  const router = useRouter()
  const [user] = useAuthState(auth)
  const setAuthModal = useSetRecoilState(authModalState)

  const handleClick = (tabIndex: number = 0) => {
    if (!user) return setAuthModal({ open: true, view: 'Login' })

    const { communityID } = router.query
    router.push({
      pathname: `${communityID}/submit`,
      query: { tabIndex }
    })
  }

  return (
    <Flex
      w="full"
      h="58px"
      bg="white"
      border="1px solid"
      px="8px"
      align="center"
      borderColor="gray.400"
      borderWidth="1px"
      borderRadius="4px"
    >
      <ImageProfileHead />
      <Input
        onClick={() => handleClick()}
        type="text"
        placeholder="Create Post"
        fontSize="10pt"
        fontWeight="semibold"
        bg="gray.50"
        h="70%"
        mx="1"
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
      <Button
        onClick={() => handleClick(1)}
        variant="iconList"
        border="unset"
        mr="1"
      >
        <IoImageOutline fontSize="20pt" />
      </Button>
      <Button onClick={() => handleClick(2)} variant="iconList" border="unset">
        <TfiLink fontSize="15pt" />
      </Button>
    </Flex>
  )
}

export default LinkPost
