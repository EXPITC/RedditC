import { User } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { firestore } from './clientApp'

const storeAccToFirestore = async (user: User) => {
  const userCredential = JSON.parse(JSON.stringify(user))

  // i do leave this uncomment
  // await addDoc(collection(firestore, "users", user.uid), userCredential)

  // Others else OAuth provider
  // I set to setDoc beacuse username of the user can change base on what their provider
  // Note: set it like put, and addDoc is more like patch
  // well it can be use set for all but that not the meaning.
  // because add will auto set generated id and when we use create 
  // community addin cummunity subs to user id then I decide to use custom id by default user.uid use Set.
  const docRef = doc(firestore, "users", user.uid)
  await setDoc(docRef, userCredential)
}

export default storeAccToFirestore
