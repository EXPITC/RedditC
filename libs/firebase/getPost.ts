import { doc, getDoc } from "firebase/firestore"
import { Post } from "../atoms/postsAtom"
import { firestore } from "./clientApp"
import collections from "./firestoreCollectionsID"



const getPost = async (postId: string) => {
  const postDocRef = doc(firestore, collections.POSTS.id, postId)

  try {
    const postDoc = await getDoc(postDocRef)

    const notFound = { data: null, err: 'No Post Found' }
    if (!postDoc.exists()) return notFound

    return {
      data: { id: postDoc.id, ...postDoc.data() } as Post,
      err: ''
    }
  } catch (e: any) {
    console.error('Get post ', e.message)

    return {
      data: null,
      err: 'Fail to get post, please try again.'
    }

  }

}

export default getPost
