import Info from '@/components/info/info'
import ContentLayouts from '@/components/layouts/content'
import PostForm from '@/components/r/submit/postForm'
import { auth } from '@/libs/firebase/clientApp'
import { Box, Divider, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useAuthState } from 'react-firebase-hooks/auth'

export default function Submit() {
  const [user] = useAuthState(auth)
  let { communityID } = useRouter().query
  communityID = typeof communityID === 'string' ? communityID : ''

  return (
    <ContentLayouts>
      <>
        <Box>
          <Text>Create a post</Text>
          <Divider my="5" borderColor="white" />
        </Box>
        <PostForm user={user} />
      </>
      <>
        <Box pt="8">
          <Info communityIdFetch={communityID} />
        </Box>
      </>
    </ContentLayouts>
  )
}
