import { ButtonBackToTop } from "@/components/buttons/ButtonBacktoTop";
import HomeInfo from "@/components/info/homeInfo";
import PremiumInfo from "@/components/info/premiumInfo";
import RecommendationInfo from "@/components/info/recommendationInfo";
import ContentLayouts from "@/components/layouts/content";
import LinkPost from "@/components/r/linkpost";
import Post from "@/components/r/postTimeline/post";
import PostsSkeleton from "@/components/skeleton/postSkeleton";
import { communitySubsState } from "@/libs/atoms/communitiesAtoms";
import useHomeFeed from "@/libs/hooks/useHomeFeed";
import useInfoModalProps from "@/libs/hooks/useInfoModalProps";
import usePost from "@/libs/hooks/usePosts";
import { Stack, Box, Flex, Text } from "@chakra-ui/react";
import { useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import { useRecoilValue } from "recoil";

export default function Home() {
  const { postStateValue, loading, getNextHomeFeed, user } = useHomeFeed()
  const postFunction = usePost()
  const openModalInfoProps = useInfoModalProps()
  const totalSubs = useRecoilValue(communitySubsState).totalSubs


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
            userVoteValue={postStateValue.userVotePost.find(i => i.postId === post.id)?.vote || 0} {...post} {...postFunction}
            openModalInfoProps={openModalInfoProps}
            alreadyInComment={false}
            link={'http://localhost:3000/r/' + post.communityId + '/comments/' + post.id}
          />)}
          {postStateValue.posts.length === 0 && totalSubs !== -1 && !loading && (
            <Flex h={['80px', "175px"]} justify="center" align="center">
              <Text color="gray.400" fontWeight="semibold" fontSize={["10pt", "14pt"]}>There are no posts in your community...<br />Hey look! there's a butterfly over there</Text>
            </Flex>
          )}
          {loading && <PostsSkeleton />}
        </Stack>
        <Box ref={ref} position="relative" bottom="150px" id="Hit this and fetch more content" />
      </>
      <>
        <Stack h="full" position="relative">
          <RecommendationInfo />
          <PremiumInfo />
          <Stack direction="column" position="relative" flexGrow="1">
            <HomeInfo />
            <ButtonBackToTop />
          </Stack>
        </Stack>
      </>
    </ContentLayouts >
  )
}
