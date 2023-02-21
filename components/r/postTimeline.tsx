import { auth } from '@/libs/firebase/clientApp'
import usePost from '@/libs/hooks/usePosts'
import { Stack, Box, Alert, AlertIcon, Text } from '@chakra-ui/react'
import { useInView } from 'framer-motion'
import { useRef, useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import PostSkeleton from '../skeleton/postSkeleton'
import Post from './postTimeline/post'

const PostTimeline = ({ communityId }: { communityId: string }) => {
  const [user] = useAuthState(auth)
  const usePostHook = usePost(communityId, user?.uid)
  const ref = useRef<HTMLDivElement>(null)
  // const onViewPort = useOnViewport(ref)
  const isInView = useInView(ref)

  const { postStateValue, loading, getNextCommunityPost, err } = usePostHook

  useEffect(() => {
    if (loading) return
    if (
      isInView &&
      postStateValue.posts.length != postStateValue.totalCollections
    )
      getNextCommunityPost()
  }, [isInView, loading])

  // const if20NlastContent = (length: number, i: number) => (length >= 19 && length === i)
  return (
    <Stack mt="10px">
      {postStateValue.posts.map(post => (
        <Post
          key={post.id}
          isUserCreator={user?.uid === post.creatorId}
          userVoteValue={
            postStateValue.userVotePost.filter(i => i.postId === post.id)[0]
              ?.vote
          }
          {...post}
          {...usePostHook}
        />
      ))}

      {loading && <PostSkeleton />}

      {err.id === communityId && (
        <Alert status="error">
          <AlertIcon />
          <Text mr="2">{err.msg}</Text>
        </Alert>
      )}
      <Box ref={ref} id="Hit this and fetch more content" />
      {postStateValue.totalCollections != 0 && postStateValue.posts.length === postStateValue.totalCollections && (
        <Alert status="info" colorScheme="purple">
          <AlertIcon />
          Few...
          <br /> you crazy scroll till the first post & the end at the time,
          <br /> have a rest..., have a good night..., I guess,,,^^ /coded at
          3:07:59 PM
        </Alert>
      )}
    </Stack>
  )
}

export default PostTimeline
