import { User } from "firebase/auth";
import { doc, getDoc, runTransaction, serverTimestamp } from "firebase/firestore";
import { firestore } from "./clientApp";
import collections from "./firestoreCollectionsID";


const createcomunnity = async (comunnityName: string, type: string, user: User | undefined | null) => {

  // Lower case the comunnity name it can be trouble when fetch with params
  const comunnityCollectionID = comunnityName.toLowerCase()
  const docRef = doc(firestore, collections.COMUNNITIES.id, comunnityCollectionID)

  const comunnity = await getDoc(docRef)

  if (comunnity.exists()) return `sorry r/${comunnityName} is already taken. Try another.`

  await runTransaction(firestore, async transaction => {
    // Create the comunnity
    const newcomunnity = {
      id: comunnityCollectionID,
      comunnityName,
      creatorId: user?.uid,
      createdAt: serverTimestamp(),
      numberOfmember: 1,
      privacyType: type
    }

    transaction.set(docRef, newcomunnity)

    // Adding cumunnity subs to user acc data
    const collectionPath = `${collections.USERS.id}/${user?.uid}/${collections.USERS.COMUNNITYSUBS.id}`
    const subRecord = {
      comunnityId: comunnityCollectionID,
      comunnityName,
      isModerator: true
    }

    transaction.set(doc(firestore, collectionPath, comunnityCollectionID), subRecord)
  })

}

export default createcomunnity
