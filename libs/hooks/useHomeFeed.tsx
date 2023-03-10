import { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../firebase/clientApp'
import { getNoUserHomeFeed, getUserHomeFeed } from 'libs/firebase/homeFeed'
import { useRecoilState, useRecoilValue } from 'recoil'
import { communitySubsState } from '../atoms/communitiesAtoms'
import { postState } from '@/libs/atoms/postsAtom'

const useHomeFeed = () => {
  const communitySubs = useRecoilValue(communitySubsState)
  const [postStateValue, setPostState] = useRecoilState(postState)
  const [user, loadingUser] = useAuthState(auth)
  const [loading, setLoading] = useState(false)

  // login
  const populateUserHomeFeed = async (lastPostId?: string) => {
    if (communitySubs.totalSubs === 0) return populateNoUserHomeFeed(lastPostId)
    setLoading(true)
    try {
      const subsId = communitySubs.subs.map(sub => sub.communityId)
      const posts = await getUserHomeFeed(subsId, lastPostId)

      if (posts.err) return //set err

      if (posts.data?.length === 0)
        return setPostState(prev => ({ ...prev, totalCollections: -1 }))
      setPostState(prev => ({
        ...prev,
        totalCollections: prev.totalCollections + posts.data!.length,
        posts: [...prev.posts, ...posts.data!]
      }))
    } finally {
      setLoading(false)
    }
  }

  //No login
  const populateNoUserHomeFeed = async (lasPostId?: string) => {
    setLoading(true)
    try {
      const posts = await getNoUserHomeFeed(lasPostId)

      if (posts.err) return //set err

      if (posts.data?.length === 0)
        return setPostState(prev => ({ ...prev, totalCollections: -1 }))
      setPostState(prev => ({
        ...prev,
        totalCollections: prev.totalCollections + posts.data!.length,
        posts: [...prev.posts, ...posts.data!]
      }))
    } finally {
      setLoading(false)
    }
  }

  const getNextHomeFeed = async () => {
    // get from last id and from data
    const lasPostId = postStateValue.posts[postStateValue.posts.length - 1].id

    if (!user) return await populateNoUserHomeFeed(lasPostId)

    await populateUserHomeFeed(lasPostId)
  }

  useEffect(() => {
    // Initialize
    // console.log(postStateValue, "HIT THIS FEYCH")
    if (postStateValue.posts.length === 0) setLoading(true)
    if (postStateValue.selectedPost) return

    if (loadingUser) return
    // console.log(loadingUser, 'loadingUser', !user, !!user)
    // console.log('HIT')
    // console.log('SPACE')
    if (postStateValue.posts.length > 0) return //console.log('BLOCK')

    if (!user) populateNoUserHomeFeed()

    if (communitySubs.totalSubs === -1) return //console.log('DOUBLE BLOCK')
    if (!!user) populateUserHomeFeed()
  }, [
    user,
    loadingUser,
    communitySubs.totalSubs,
    postStateValue.posts,
    postStateValue.selectedPost
  ])

  return {
    populateUserHomeFeed,
    populateNoUserHomeFeed,
    getNextHomeFeed,
    loading,
    postStateValue,
    user
  }
}

export default useHomeFeed
