import { doesNotMatch } from 'assert'
import { collection, deleteDoc, doc, getDoc, increment, writeBatch, where, query, getDocs } from 'firebase/firestore'
import { deleteObject, ref } from 'firebase/storage'
import router from 'next/router'
import { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { authModalState } from '../atoms/authModalAtoms'
import { communitySub, communitySubsState } from '../atoms/communitiesAtoms'
import { auth, firestore, storage } from '../firebase/clientApp'
import getcommunityData, { getUserCommunitySubs } from '../firebase/communityData'
import collections from '../firebase/firestoreCollectionsID'

interface useCommunityDataT {
  communityId: string
  communityName: string
}

const useCommunityData = ({
  communityId,
  communityName
}: useCommunityDataT) => {
  communityId = communityId.toLowerCase()
  const [user] = useAuthState(auth)
  const setAuthModal = useSetRecoilState(authModalState)
  const [communitySubs, setCommunitySubs] = useRecoilState(communitySubsState)
  const [loading, setLoading] = useState(false)
  const subsCollectionPath = `${collections.USERS.id}/${user?.uid}/${collections.USERS.COMMUNITYSUBS.id}`

  // Pass the communityId to check user join or not
  const isJoin = !!communitySubs.subs.find(sub => sub.communityId === communityId)

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
        subs: [...communitySubs.subs, newSubData],
        currentCommunity: {
          ...prev.currentCommunity,
          numberOfmember: prev.currentCommunity.numberOfmember + 1
        }
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
      const latestCommunityData = await getDoc(communityDoc)
      if (latestCommunityData.exists()) {
        if (latestCommunityData.data().numberOfmember === 0) {
          // new iteration for batch
          const batch2 = writeBatch(firestore)
          batch2.delete(communityDoc)

          //Variable need to get the data
          const postCollectionPath = collection(firestore, collections.POSTS.id)
          const commentCollectionPath = collection(firestore, collections.COMMENTS.id)

          const selectOnlyCommunityRelated = where('communityId', '==', communityId)

          const postQuery = query(postCollectionPath, selectOnlyCommunityRelated)
          const commentQuery = query(commentCollectionPath, selectOnlyCommunityRelated)

          //Get the data
          const postCollection = await getDocs(postQuery)
          const commentCollection = await getDocs(commentQuery)

          //execute
          for (const userId of latestCommunityData.data().intractedUserId) {
            const voteUserCollectionPath = collection(firestore, `${collections.USERS.id}/${userId}/${collections.USERS.VOTEPOST.id}`)
            const voteUserQuery = query(voteUserCollectionPath, selectOnlyCommunityRelated)

            //get the latest data
            const voteUserCollection = await getDocs(voteUserQuery)

            voteUserCollection.forEach(doc => batch2.delete(doc.ref))
          }

          postCollection.forEach(doc => batch2.delete(doc.ref))
          commentCollection.forEach(doc => batch2.delete(doc.ref))

          // execute for storage
          await batch2.commit()
            .then(() => {
              // delete image posted
              postCollection.forEach(async doc => {
                if (doc.data().imgUrl) {
                  const imgRef = ref(storage, `${collections.POSTS.id}/${doc.id}/${collections.POSTS.storage.image.id}`)
                  await deleteObject(imgRef)
                }
              })

              setCommunitySubs(prev => ({
                ...prev,
                subs: communitySubs.subs.filter(prev => prev.communityId != communityId),
                currentCommunity: {
                  id: '',
                  communityName: '',
                  imageUrl: '',
                  createdAt: {
                    seconds: 0,
                    nanoseconds: 0
                  },
                  creatorId: '',
                  numberOfmember: 0,
                  intractedUserId: [],
                  privacyType: ''
                }
              })
              )

              setLoading(false)
              router.push('/')
            }
            )
        }
      }
      setCommunitySubs(prev => ({
        ...prev,
        subs: communitySubs.subs.filter(prev => prev.communityId != communityId),
        currentCommunity: {
          ...prev.currentCommunity,
          numberOfmember: prev.currentCommunity.numberOfmember - 1
        }
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

  const getCurrentCommunity = async () => {

    const currentCommunity = await getcommunityData(communityId)
    if (!currentCommunity) return console.error('Fail to fetch community data to current community')
    setCommunitySubs(prev => ({
      ...prev,
      currentCommunity
    }))
  }

  useEffect(() => {
    if (communitySubs.currentCommunity.id === communityId) return // Its same data  
    getCurrentCommunity()

  }, [communityId])

  return {
    communitySubs,
    setCommunitySubs,
    isJoin,
    joinOrleaveCommunity,
    loading
  }
}

export default useCommunityData
