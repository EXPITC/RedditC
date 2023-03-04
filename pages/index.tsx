import ContentLayouts from "@/components/layouts/content";
import LinkPost from "@/components/r/linkpost";
import Post from "@/components/r/postTimeline/post";
import PostsSkeleton from "@/components/skeleton/postSkeleton";
import useHomeFeed from "@/libs/hooks/useHomeFeed";
import usePost from "@/libs/hooks/usePosts";
import { Stack, Box } from "@chakra-ui/react";
import { useInView } from "framer-motion";
import { useEffect, useRef } from "react";

export default function Home() {
  const { postStateValue, loading, getNextHomeFeed, user } = useHomeFeed()
  const postFunction = usePost()

  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref)

  useEffect(() => {
    if (loading) return
    if (postStateValue.totalCollections === -1) return

    if (inView) getNextHomeFeed()
  }, [inView, postStateValue.totalCollections, loading])

  return (
    <ContentLayouts>
      <>
        <LinkPost />
        <Stack mt="10px">
          {postStateValue.posts.map(post => <Post key={post.id} homeFeed
            isUserCreator={user?.uid === post.creatorId}
            userVoteValue={postStateValue.userVotePost.find(i => i.postId === post.id)?.vote || 0} {...post} {...postFunction} />)}
          {loading && <PostsSkeleton />}
          <Box ref={ref} id="Hit this and fetch more content" />
        </Stack>
      </>
      <>
      </>
    </ContentLayouts>
  )
}
