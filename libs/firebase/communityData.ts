import { doc, getDoc, DocumentData } from "firebase/firestore"
import { firestore } from "./clientApp"
import collections from "./firestoreCollectionsID"

const getcommunityData = async (communityID: string): Promise<DocumentData | false> => {

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


export default getcommunityData
