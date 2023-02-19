import { addDoc, collection, updateDoc } from 'firebase/firestore'
import { getDownloadURL, ref, uploadString } from 'firebase/storage'
import { Post } from '../atoms/postsAtom'
import { firestore, storage } from './clientApp'
import collections from './firestoreCollectionsID'

const uploadPost = async (newPost: Post, imgUrl: string) => {
  try {
    const collectionPostPath = collection(firestore, collections.POSTS.id)
    const postRef = await addDoc(collectionPostPath, newPost)
    const id = postRef.id
    await updateDoc(postRef, { id })

    if (!imgUrl) return { id }
    const collectionPostImgPath = `${collections.POSTS.id}/${id}/image`
    const imgRef = ref(storage, collectionPostImgPath)

    // https://firebase.google.com/docs/storage/web/upload-files
    await uploadString(imgRef, imgUrl, 'data_url')
    const getImgUrl = await getDownloadURL(imgRef)

    // update post imgurl
    await updateDoc(postRef, {
      imgUrl: getImgUrl
    })

    return {
      id,
      imgUrl: getImgUrl
    }
  } catch (e: any) {
    console.error('upload post ', e.message)
    return {
      err: 'Error Creating Post'
    }
  }
}

export default uploadPost
