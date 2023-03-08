import ContentLayouts from "@/components/layouts/content"
import Post from "@/components/r/postTimeline/post"
import { auth } from "@/libs/firebase/clientApp"
import usePost from "@/libs/hooks/usePosts"
import { useRouter } from "next/router"
import { useEffect, useRef } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import Comments from "@/components/r/comments"
import { PostSkeleton } from "@/components/skeleton/postSkeleton"
import { useRecoilState } from "recoil"
import { communitySubsState, currentCommunity } from "@/libs/atoms/communitiesAtoms"
import Info from "@/components/info/info"
import { Flex } from "@chakra-ui/react"
import { ButtonBackToTop } from "@/components/buttons/ButtonBacktoTop"
import useInfoModalProps from "@/libs/hooks/useInfoModalProps"



export default function PostCommentPage() {
  let { communityID, pid } = useRouter().query
  communityID = typeof communityID === 'string' ? communityID : ''
  pid = typeof pid === 'string' ? pid : ''


  const ref = useRef<HTMLDivElement>(null)
  const [user] = useAuthState(auth)
  const usePostHook = usePost(communityID, pid)
  const [communitySubs, setCommunitySubs] = useRecoilState(communitySubsState)
  const openModalInfoProps = useInfoModalProps()

  const { postStateValue, setPostState } = usePostHook

  useEffect(() => {

    return () => {
      // lifecycle
      setPostState(prev => ({
        ...prev,
        selectedPost: null
      }))
      if (communitySubs.currentCommunity.id === communityID) return
      setCommunitySubs(prev => ({
        ...prev,
        currentCommunity
      }))
    }
  }, [])

  return (
    <ContentLayouts>
      <>
        {postStateValue.selectedPost ?
          <Post
            isUserCreator={user?.uid === postStateValue.selectedPost!.creatorId}
            userVoteValue={postStateValue.userVotePost.find(i => i.postId === postStateValue.selectedPost!.id)?.vote || 0}
            {...postStateValue.selectedPost}
            {...usePostHook}
            openModalInfoProps={openModalInfoProps}
            alreadyInComment={true}
          />
          :
          <PostSkeleton selectedPost={true} />
        }
        <Comments
          user={user}
          selectedPost={postStateValue?.selectedPost}
          setPostState={setPostState}
        />

      </>
      <>
        <Info communityIdFetch={communityID} />
        <Flex ref={ref} direction="column" flexGrow="1" >
          <Flex display={(ref.current?.clientHeight || 0) >= 1100 ? "initial" : 'none'} mt={(ref.current?.clientHeight || 0) >= 1100 ? "1100px" : "0px"} direction="column" position="relative" flexGrow="1" >
            <ButtonBackToTop />
          </Flex>
        </Flex>
      </>
    </ContentLayouts>
  )
}
