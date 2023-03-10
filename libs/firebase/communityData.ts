import { doc, getDoc, getDocs, collection } from 'firebase/firestore'
import { communityData, communitySub } from '../atoms/communitiesAtoms'
import { firestore } from './clientApp'
import collections from './firestoreCollectionsID'

const getcommunityData = async (
  communityID: string
): Promise<communityData | false> => {
  const communityRef = doc(
    firestore,
    collections.COMMUNITIES.id,
    communityID.toLowerCase()
  )
  try {
    if (!communityID) return false
    const communityData = await getDoc(communityRef)
    if (!communityData.exists()) return false

    const _ = communityData.data() as communityData

    return {
      ..._,
      // Serialize time stamp from fire store double object timestamp signature firestore cannot be parse so we need to break down the seconds and nanoscond
      createdAt: { ..._.createdAt } as { seconds: number; nanoseconds: number }
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
  const subs: string[] = []
  let imgUrl: { [key: string]: string } = {}

  subsDoc.docs.map(doc => subs.push(doc.data().communityId))

  for (const sub of subs) {
    const communityPath = doc(firestore, collections.COMMUNITIES.id, sub)
    const communityDoc = await getDoc(communityPath)
    if (communityDoc.exists()) {
      imgUrl = {
        ...imgUrl,
        [communityDoc.data().id]: communityDoc.data()?.imageUrl
      }
    }
  }

  return subsDoc.docs.map(doc => ({
    ...doc.data(),
    imageUrl: imgUrl[doc.data().communityId as string]
  })) as communitySub[]
}

export { getcommunityData as default, getUserCommunitySubs }
