import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { SetterOrUpdater, useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil'
import { authModalState } from '../atoms/authModalAtoms'
import { communitySubsState, currentCommunity } from '../atoms/communitiesAtoms'
import { PostState, postState } from '../atoms/postsAtom'
import { auth } from '../firebase/clientApp'
import deletePost from '../firebase/deletePost'
import getPost from '../firebase/getPost'
import getPosts from '../firebase/getPosts'
import handleVote, { deleteVote, getUserVote } from '../firebase/handleVote'

export interface usePost {
  postStateValue: PostState
  setPostState: SetterOrUpdater<PostState>
  getNextCommunityPost: () => Promise<void>
  err: {
    id: string
    msg: string
  }
  loading: string
  onVote: (postId: string, communityId: string, n: number, e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  onDelete: (id: string, imgUrl: string | undefined, e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  onSelect: (pid: string, communityId: string) => void
}

// selectedPost contain id of post
const usePost = (communityId: string = '', selectedPostId: string = ''): usePost => {
  const userId = useAuthState(auth)[0]?.uid
  communityId = communityId?.toLowerCase()
  const [postStateValue, setPostState] = useRecoilState(postState)
  const resetPostState = useResetRecoilState(postState)
  const [communitySubs, setCommunitySubs] = useRecoilState(communitySubsState)
  const router = useRouter()
  const setAuthModalState = useSetRecoilState(authModalState)
  const [err, setErr] = useState({
    id: '',
    msg: ''
  })
  const [loading, setLoading] = useState('')

  const populateCommunityPost = async (startFromLastPost?: string) => {
    setLoading('true')
    try {
      const posts = await getPosts(communityId, startFromLastPost)
      posts.data.unshift(...postStateValue.posts)

      if (typeof posts === 'string') return
      setPostState(prev => ({
        ...prev,
        totalCollections: posts.totalCollections,
        posts: posts.data
      }))
    } catch (e: any) {
      console.error('Fail to fetch post', e.message)
      setErr({
        id: communityId,
        msg: 'Fail to fetch new post, you can try to refresh your page, if the issue still occur you can contact EXPITC for further investigation'
      })
    }
    setLoading('')
  }

  const getNextCommunityPost = async () => {
    await populateCommunityPost(
      postStateValue.posts[postStateValue.posts.length - 1].id
    )
  }

  const onDelete = async (id: string, imgUrl: string | undefined, e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation()
    const existingVoteData = postStateValue.userVotePost.filter(
      vote => vote.postId === id
    )[0]

    setLoading(id)
    try {
      const delPost = await deletePost({ id, imgUrl })
      let delVote = { err: '' }
      if (!!existingVoteData)
        delVote = await deleteVote(userId!, existingVoteData.postId)

      if (delPost.err || delVote.err)
        return setErr({ id, msg: delPost.err || delVote.err })
      setPostState(prev => ({
        ...prev,
        totalCollections: prev.totalCollections - 1,
        posts: prev.posts.filter(post => post.id !== id),
        userVotePost: prev.userVotePost.filter(vote => vote.postId !== id)
      }))
    } finally {
      setLoading('')
      if (selectedPostId) router.push(`/r/${communityId}`)
    }
  }

  const onVote = async (postId: string, communityId: string, n: number, e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation()
    if (!userId) return setAuthModalState({ open: true, view: 'Login' })

    const existingVoteData = postStateValue.userVotePost.filter(
      vote => vote.postId === postId
    )[0]
    const defaultVoteData = {
      postId,
      communityId,
      vote: 0
    }
    const voteUserData = existingVoteData || defaultVoteData
    const userAlreadyInteracted = communitySubs.currentCommunity.id ? communitySubs.currentCommunity.intractedUserId.find(prevUserId => prevUserId === userId) : false // string | undifiend | false
    const toFirebase = await handleVote(userId, voteUserData, n, userAlreadyInteracted)

    if (toFirebase.err) return

    const votePostData = postStateValue.posts.filter(
      vote => vote.id === postId
    )[0] || postStateValue.selectedPost

    const votePostKey = postStateValue.posts.findIndex(
      vote => vote.id === postId
    )
    let voteUserKey = postStateValue.userVotePost.findIndex(
      vote => vote.postId === postId
    )
    voteUserKey =
      voteUserKey !== -1 ? voteUserKey : postStateValue.userVotePost.length

    const updatedDataPost = [...postStateValue.posts]
    const updatedDataUser = [...postStateValue.userVotePost]
    let updatedSelectedPost = postStateValue.selectedPost ? { ...postStateValue.selectedPost } : null

    const voteUser = voteUserData.vote + toFirebase.vote
    const votePost = votePostData.vote + toFirebase.vote

    updatedDataUser[voteUserKey] = {
      ...voteUserData,
      vote: voteUser
    }
    if (updatedDataPost.length > 0)
      updatedDataPost[votePostKey] = {
        ...updatedDataPost[votePostKey],
        vote: votePost
      }
    if (updatedSelectedPost)
      updatedSelectedPost = { ...updatedSelectedPost, vote: votePost }

    setPostState(prev => ({
      ...prev,
      userVotePost: updatedDataUser,
      posts: updatedDataPost,
      selectedPost: updatedSelectedPost
    }))
    setCommunitySubs(prev => ({
      ...prev,
      currentCommunity: {
        ...prev.currentCommunity,
        intractedUserId: [userId, ...prev.currentCommunity.intractedUserId]
      }
    }))
  }

  const populateUserVote = async () => {
    const userVotePost = await getUserVote(userId!)
    if (!userVotePost) return console.error('Faild to populate user vote')

    setPostState(prev => ({
      ...prev,
      userVotePost
    }))
  }

  const onSelect = (pid: string, communityId: string) => {

    // populate selected data post before redirect to comments
    setPostState(prev => ({
      ...prev,
      selectedPost: [...prev.posts].find(post => post.id === pid) || null
    }))
    router.push(`/r/${communityId}/comments/${pid}`)
  }

  const populateSelectedPost = async () => {
    const post = await getPost(selectedPostId)
    if (post.err) return setErr({ id: selectedPostId, msg: post.err })

    setPostState(prev => ({
      ...prev,
      selectedPost: post.data,
    }))
  }

  useEffect(() => {
    if (!communityId && !selectedPostId) return
    // Initial
    // Initial post return 20 post desc
    if (postStateValue.totalCollections < 0 && !selectedPostId) populateCommunityPost()
    if (!postStateValue.selectedPost && !!selectedPostId) populateSelectedPost()
    if (!postStateValue.userVotePost.length && userId) populateUserVote()

  }, [userId, selectedPostId, postStateValue])


  useEffect(() => {
    const useFromHome = !communityId && !selectedPostId
    const fromCommunityNotFromCommentPage = !!communitySubs.currentCommunity.id && !postStateValue.selectedPost?.id

    // because i left currentCommunity from community or r pages and clear currentCommunity && selectedPostId when left selected page or comment page 
    if (useFromHome && fromCommunityNotFromCommentPage) { resetPostState(), setCommunitySubs(prev => ({ ...prev, currentCommunity })) }//'From community to main' 

    return () => {
      // reset to default when switch between community but remaind same when access property of smae community like comments page in same community
      if (!communityId || selectedPostId) return //from main page back to comment vise versa
      if (communityId === communitySubs.currentCommunity.id) return //from community to comment and vise versa
      resetPostState() //this hit when community to diffrent community page
    }
  }, [communityId, communitySubs.currentCommunity, selectedPostId, postStateValue.selectedPost])


  return {
    postStateValue,
    setPostState,
    getNextCommunityPost,
    err,
    loading,
    onVote,
    onDelete,
    onSelect
  }
}

export default usePost
