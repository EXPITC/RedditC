import ContentLayouts from "@/components/layouts/content"
import Post from "@/components/r/postTimeline/post"
import Info from '@/components/info'
import getcommunityData from 'libs/firebase/communityData'
import { auth } from "@/libs/firebase/clientApp"
import usePost from "@/libs/hooks/usePosts"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { useSetRecoilState } from "recoil"
import { communitySubsState } from "@/libs/atoms/communitiesAtoms"
import Comments from "@/components/r/comments"



export default function PostCommentPage() {
  const router = useRouter()
  const { communityID, pid } = router.query
  if (typeof communityID != 'string') return
  if (typeof pid != 'string') return

  const [user] = useAuthState(auth)
  const usePostHook = usePost(communityID as string, user?.uid, pid)

  const { postStateValue, setPostState, loading, err } = usePostHook

  useEffect(() => {

    return () => setPostState(prev => ({
      ...prev,
      selectedPost: null
    }))
  }, [])

  return (
    postStateValue.selectedPost &&
    <ContentLayouts>
      <>
        <Post
          isUserCreator={user?.uid === postStateValue.selectedPost!.creatorId}
          userVoteValue={
            postStateValue.userVotePost.filter(i => i.postId === postStateValue.selectedPost!.id)[0]
              ?.vote
          }
          {...postStateValue.selectedPost}
          {...usePostHook} />
        {/* <Comments /> */}
      </>
      <>
        <Info />
      </>
    </ContentLayouts>
  )
}
