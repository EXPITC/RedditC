import { addDoc, collection, updateDoc } from "firebase/firestore"
import { getDownloadURL, ref, uploadString } from "firebase/storage"
import { Post } from "../atoms/postsAtom"
import { firestore, storage } from "./clientApp"
import collections from "./firestoreCollectionsID"

interface uploadPostProps {
  newPost: Post
  imgUrl: string
}
const uploadPost = async ({ newPost, imgUrl }: uploadPostProps) => {

  try {
    const collectionPostPath = collection(firestore, collections.POSTS.id)
    const postRef = await addDoc(collectionPostPath, newPost)

    if (!imgUrl) return
    const collectionPostImgPath = `${collections.POSTS.id}/${postRef.id}/image`
    const imgRef = ref(storage, collectionPostImgPath)

    console.log(imgUrl)
    // https://firebase.google.com/docs/storage/web/upload-files
    await uploadString(imgRef, imgUrl, "data_url")
    const getImgUrl = await getDownloadURL(imgRef)

    // update post imgurl
    await updateDoc(postRef, {
      imgUrl: getImgUrl
    })

  } catch (e: any) {
    console.error('upload post ', e.message)
    return 'Error Creating Post'
  }
}

export default uploadPost
