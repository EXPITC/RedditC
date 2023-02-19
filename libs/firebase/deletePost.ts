import { deleteDoc, doc } from "firebase/firestore"
import { deleteObject, ref } from "firebase/storage"
import { firestore, storage } from "./clientApp"
import collections from "./firestoreCollectionsID"


const deletePost = async ({ id, imgUrl }: { id: string, imgUrl: string | undefined }) => {

  try {
    const postDocRef = doc(firestore, collections.POSTS.id, id)
    await deleteDoc(postDocRef)

    if (imgUrl) {
      const imgRef = ref(storage, `${collections.POSTS.id}/${id}/${collections.POSTS.xPost.image.id}`)
      await deleteObject(imgRef)
    }

    return {
      err: ''
    }
  } catch (e: any) {
    console.error('delete post ', e.message)

    return {
      err: 'Fail to delete post'
    }
  }

}

export default deletePost
