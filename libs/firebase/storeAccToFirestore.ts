import { User } from 'firebase/auth'
import { addDoc, collection, doc, setDoc } from 'firebase/firestore'
import { firestore } from './clientApp'

const storeAccToFirestore = async (user: User, signup: boolean = false) => {
  const userCredential = JSON.parse(JSON.stringify(user))

  if (signup)
    return await addDoc(collection(firestore, "users"), userCredential)

  // Others else OAuth provider
  // I set to setDoc beacuse username of the user can change base on what their provider
  // Note: set it like put, and addDoc is more like patch
  // well it can be use set for all but that not the meaning.
  const docRef = doc(firestore, "users", user.uid)
  await setDoc(docRef, userCredential)
}

export default storeAccToFirestore
