import { User } from "firebase/auth";
import { doc, getDoc, runTransaction, serverTimestamp, setDoc } from "firebase/firestore";
import { firestore } from "./clientApp";



const createCommunity = async (communityName: string, type: string, user: User | undefined | null) => {

  const docRef = doc(firestore, 'communities', communityName)

  const community = await getDoc(docRef)

  if (community.exists()) return `sorry r/${communityName} is already taken. Try another.`

  await runTransaction(firestore, async transaction => {

    const newCommunity = {
      creatorId: user?.uid,
      createdAt: serverTimestamp(),
      numberOfmember: 1,
      privacyType: type
    }

    transaction.set(docRef, newCommunity)

    const collectionPath = `users/${user?.uid}/communitySubs`
    const subRecord = {
      communityId: communityName,
      isModerator: true
    }

    transaction.set(doc(firestore, collectionPath, communityName), subRecord)
  })

}

export default createCommunity
