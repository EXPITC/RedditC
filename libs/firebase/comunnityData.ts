import { doc, getDoc, DocumentData } from "firebase/firestore"
import { firestore } from "./clientApp"
import collections from "./firestoreCollectionsID"

const getComunnityData = async (comunnityID: string): Promise<DocumentData | false> => {

  const comunnityRef = doc(firestore, collections.COMUNNITIES.id, comunnityID)
  try {
    const comunnityData = await getDoc(comunnityRef)
    if (!comunnityData.exists()) return false


    const _ = comunnityData.data()
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


export default getComunnityData
