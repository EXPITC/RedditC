import { User } from 'firebase/auth'
import {
  doc,
  getDoc,
  runTransaction,
  serverTimestamp
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

  const community = await getDoc(docRef)

  if (community.exists())
    return `sorry r/${communityName} is already taken. Try another.`

  await runTransaction(firestore, async transaction => {
    // Create the community
    const newcommunity = {
      id: communityCollectionID,
      communityName,
      imageUrl: '',
      creatorId: user?.uid,
      createdAt: serverTimestamp(),
      numberOfmember: 1,
      privacyType: type
    }

    transaction.set(docRef, newcommunity)

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
}

export default createcommunity
