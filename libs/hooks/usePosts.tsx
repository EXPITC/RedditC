import { useEffect, useState } from 'react'
import { SetterOrUpdater, useRecoilState, useSetRecoilState } from 'recoil'
import { authModalState } from '../atoms/authModalAtoms'
import { PostState, postState } from '../atoms/postsAtom'
import deletePost from '../firebase/deletePost'
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
  onVote: (postId: string, n: number, e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  onDelete: (id: string, imgUrl: string | undefined, e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  onSelect: () => void
}

const usePost = (communityId: string, userId: string | undefined): usePost => {
  const [postStateValue, setPostState] = useRecoilState(postState)
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
    }
  }

  const onVote = async (postId: string, n: number, e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
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
    const toFirebase = await handleVote(userId, voteUserData, n)

    if (toFirebase.err) return

    const votePostData = postStateValue.posts.filter(
      vote => vote.id === postId
    )[0]

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

    const voteUser = voteUserData.vote + toFirebase.vote
    const votePost = votePostData.vote + toFirebase.vote

    updatedDataUser[voteUserKey] = {
      ...voteUserData,
      vote: voteUser
    }
    updatedDataPost[votePostKey] = {
      ...updatedDataPost[votePostKey],
      vote: votePost
    }
    setPostState(prev => ({
      ...prev,
      userVotePost: updatedDataUser,
      posts: updatedDataPost
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

  const onSelect = async () => { }

  useEffect(() => {
    // Initial
    // Initial post return 20 post desc
    if (postStateValue.totalCollections === 0) populateCommunityPost()
    if (!postStateValue.userVotePost.length && userId) populateUserVote()
  }, [userId])

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
