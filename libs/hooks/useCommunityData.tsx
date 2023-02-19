import { doc, increment, writeBatch } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { authModalState } from '../atoms/authModalAtoms'
import { communitySub, communitySubsState } from '../atoms/communitiesAtoms'
import { auth, firestore } from '../firebase/clientApp'
import { getUserCommunitySubs } from '../firebase/communityData'
import collections from '../firebase/firestoreCollectionsID'

interface useCommunityDataT {
  communityId: string
  communityName: string
}

const useCommunityData = ({
  communityId,
  communityName
}: useCommunityDataT) => {
  const [user] = useAuthState(auth)
  const setAuthModal = useSetRecoilState(authModalState)
  const [communitySubs, setCommunitySubs] = useRecoilState(communitySubsState)
  const [loading, setLoading] = useState(false)
  const subsCollectionPath = `${collections.USERS.id}/${user?.uid}/${collections.USERS.COMMUNITYSUBS.id}`

  // If there any user get the community that user in
  const getSubsList = async () => {
    const subs = user ? await getUserCommunitySubs(user.uid) : null

    if (subs) setCommunitySubs(prev => ({
      ...prev,
      subs
    }))
  }
  useEffect(() => {
    if (user) getSubsList()
  }, [user])

  // Pass the communityId to check user join or not
  const isJoin = !!communitySubs.subs.find(subs => subs.communityId === communityId)

  // Register user to community
  const join = async () => {
    setLoading(true)

    try {
      const batch = writeBatch(firestore)

      // Adding new subs to user subs collections
      const newSubData: communitySub = {
        communityId,
        communityName,
        isModerator: false
      }
      const newDocPath = doc(firestore, subsCollectionPath, communityId)

      batch.set(newDocPath, newSubData)

      // Update new member record in the community
      const communityDoc = doc(
        firestore,
        collections.COMMUNITIES.id,
        communityId
      )

      batch.update(communityDoc, {
        numberOfmember: increment(1)
      })

      // Execute the changes
      await batch.commit()

      setCommunitySubs(prev => ({
        ...prev,
        subs: [...communitySubs.subs, newSubData]
      }))
    } catch (e: any) {
      console.log('join err ', e.message)
    }
    setLoading(false)
  }

  const leave = async () => {
    setLoading(true)

    try {
      const batch = writeBatch(firestore)

      // Delete community from user subs collection
      const subDocInUser = doc(firestore, subsCollectionPath, communityId)
      batch.delete(subDocInUser)

      // Decrement number of member in community
      const communityDoc = doc(
        firestore,
        collections.COMMUNITIES.id,
        communityId
      )
      batch.update(communityDoc, {
        numberOfmember: increment(-1)
      })

      await batch.commit()
      setCommunitySubs(prev => ({
        ...prev,
        subs: communitySubs.subs.filter(prev => prev.communityId != communityId)
      })
      )
    } catch (e: any) {
      console.log('leave err ', e.message)
    }

    setLoading(false)
  }

  const joinOrleaveCommunity = () => {
    if (!user) return setAuthModal({ open: true, view: 'Login' })
    if (isJoin) return leave()

    join()
  }

  return {
    communitySubs,
    isJoin,
    joinOrleaveCommunity,
    loading
  }
}

export default useCommunityData
