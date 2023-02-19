import {
  doc,
  getDoc,
  DocumentData,
  getDocs,
  collection
} from 'firebase/firestore'
import { communitySubsCollection } from '../atoms/communitiesAtoms'
import { firestore } from './clientApp'
import collections from './firestoreCollectionsID'

const getcommunityData = async (
  communityID: string
): Promise<DocumentData | false> => {
  const communityRef = doc(firestore, collections.COMMUNITIES.id, communityID)
  try {
    const communityData = await getDoc(communityRef)
    if (!communityData.exists()) return false

    const _ = communityData.data()
    return {
      ..._,
      // Serialize time stamp from fire store double object timestamp signature firestore cannot be parse so we need to break down the seconds and nanoscond
      createdAt: { ..._.createdAt }
    }
  } catch (e: any) {
    console.log(e.message)

    return false
  }
}

const getUserCommunitySubs = async (userId: string) => {
  const subsDoc = await getDocs(
    collection(
      firestore,
      `${collections.USERS.id}/${userId}/${collections.USERS.COMMUNITYSUBS.id}`
    )
  )

  return subsDoc.docs.map(doc => ({ ...doc.data() })) as communitySubsCollection
}

export { getcommunityData as default, getUserCommunitySubs }
