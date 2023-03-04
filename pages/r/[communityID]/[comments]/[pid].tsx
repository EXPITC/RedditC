import ContentLayouts from "@/components/layouts/content"
import Post from "@/components/r/postTimeline/post"
import Info from '@/components/info'
import { auth } from "@/libs/firebase/clientApp"
import usePost from "@/libs/hooks/usePosts"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import Comments from "@/components/r/comments"
import { PostSkeleton } from "@/components/skeleton/postSkeleton"
import { useRecoilState } from "recoil"
import { communitySubsState, currentCommunity } from "@/libs/atoms/communitiesAtoms"



export default function PostCommentPage() {
  const router = useRouter()
  let { communityID, pid } = router.query
  communityID = typeof communityID === 'string' ? communityID : ''
  pid = typeof pid === 'string' ? pid : ''


  const [user] = useAuthState(auth)
  const usePostHook = usePost(communityID, pid)
  const [communitySubs, setCommunitySubs] = useRecoilState(communitySubsState)

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
            {...usePostHook} />
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
        <Info />
      </>
    </ContentLayouts>
  )
}
