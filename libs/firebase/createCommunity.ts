import { User } from 'firebase/auth'
import {
  doc,
  getDoc,
  runTransaction,
  serverTimestamp,
  Timestamp
} from 'firebase/firestore'
import { firestore } from './clientApp'
import collections from './firestoreCollectionsID'

const createcommunity = async (
  communityName: string,
  type: string,
  user: User | undefined | null
) => {
  // Lower case the community name it can be trouble when fetch with params
  const communityCollectionID = communityName.toLowerCase()
  const docRef = doc(
    firestore,
    collections.COMMUNITIES.id,
    communityCollectionID
  )
  try {


    const community = await getDoc(docRef)

    if (community.exists())
      return {
        err: `sorry r/${communityName} is already taken. Try another.`,
      }

    const newCommunity = {
      id: communityCollectionID,
      communityName,
      imageUrl: '',
      creatorId: user!.uid,
      createdAt: serverTimestamp(),
      numberOfmember: 1,
      intractedUserId: [],
      privacyType: type
    }

    await runTransaction(firestore, async transaction => {
      // Create the community

      transaction.set(docRef, newCommunity)

      // Adding cumunnity subs to user acc data
      const collectionPath = `${collections.USERS.id}/${user?.uid}/${collections.USERS.COMMUNITYSUBS.id}`
      const subRecord = {
        communityId: communityCollectionID,
        communityName,
        isModerator: true
      }

      transaction.set(
        doc(firestore, collectionPath, communityCollectionID),
        subRecord
      )
    })
    return {
      err: '',
      data: {
        ...newCommunity,
        createdAt: { seconds: Date.now() / 1000, nanoseconds: Date.now() / 10000 }
      }
    }
  } catch (e: any) {
    console.error('create community', e.message)
    return {
      err: 'Create community Fail'
    }
  }
}

export default createcommunity
