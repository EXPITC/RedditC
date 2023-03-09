import { auth } from '@/libs/firebase/clientApp'
import useInfoModalProps from '@/libs/hooks/useInfoModalProps'
import usePost from '@/libs/hooks/usePosts'
import { Stack, Box, Alert, AlertIcon, Text, Flex } from '@chakra-ui/react'
import { useInView } from 'framer-motion'
import { useRef, useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import PostsSkeleton from '../skeleton/postSkeleton'
import Post from './postTimeline/post'

const PostTimeline = ({ communityId }: { communityId: string }) => {
  const [user] = useAuthState(auth)
  const usePostHook = usePost(communityId)
  const ref = useRef<HTMLDivElement>(null)
  // const onViewPort = useOnViewport(ref)
  const isInView = useInView(ref)

  const { postStateValue, loading, getNextCommunityPost, err } = usePostHook
  const openModalInfoProps = useInfoModalProps()

  useEffect(() => {
    console.log(postStateValue.posts.length, postStateValue.totalCollections)
    if (loading) return
    if (postStateValue.totalCollections < 20) return //Mean disable this feature if there is no yet 20 post in the community, cuz by default it fetch 20 post
    if (isInView && postStateValue.posts.length != postStateValue.totalCollections) getNextCommunityPost()
  }, [isInView, loading])


  return (
    <Stack mt="10px">
      {postStateValue.posts.map(post => (
        <Post
          key={post.id}
          isUserCreator={user?.uid === post.creatorId}
          userVoteValue={postStateValue.userVotePost.find(i => i.postId === post.id)?.vote || 0}
          link={'http://localhost:3000/r/' + post.communityId + '/comments/' + post.id}
          openModalInfoProps={openModalInfoProps}
          alreadyInComment={false}
          {...post}
          {...usePostHook}
        />
      ))}

      {postStateValue.totalCollections === 0 && (
        <Flex h={['80px', "175px"]} justify="center" align="center">
          <Text color="gray.400" fontWeight="semibold" fontSize={["10pt", "14pt"]}>No Post Yet..., I think I should have put dino here</Text>
        </Flex>
      )}

      {loading && <PostsSkeleton />}

      {err.id === communityId && (
        <Alert status="error">
          <AlertIcon />
          <Text mr="2">{err.msg}</Text>
        </Alert>
      )}
      <Box ref={ref} position="relative" bottom="150px" id="Hit this and fetch more content" />
      {postStateValue.totalCollections >= 100 && postStateValue.posts.length === postStateValue.totalCollections && (
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
