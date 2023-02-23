import {
  doc,
  getDoc,
  getDocs,
  collection
} from 'firebase/firestore'
import { communityData, communitySub } from '../atoms/communitiesAtoms'
import { firestore } from './clientApp'
import collections from './firestoreCollectionsID'

const getcommunityData = async (
  communityID: string
): Promise<communityData | false> => {
  const communityRef = doc(firestore, collections.COMMUNITIES.id, communityID)
  try {
    if (!communityID) return false
    const communityData = await getDoc(communityRef)
    if (!communityData.exists()) return false

    const _ = communityData.data() as communityData

    return {
      ..._,
      // Serialize time stamp from fire store double object timestamp signature firestore cannot be parse so we need to break down the seconds and nanoscond
      createdAt: { ..._.createdAt } as { seconds: number, nanoseconds: number }

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

  return subsDoc.docs.map(doc => ({ ...doc.data() })) as communitySub[]
}

export { getcommunityData as default, getUserCommunitySubs }
