import { comment } from "@/components/r/comments/comment"
import { collection, doc, getDocs, increment, orderBy, query, Timestamp, where, writeBatch } from "firebase/firestore"
import { firestore } from "./clientApp"
import collections from "./firestoreCollectionsID"


const handleComment = async (newComment: comment) => {

  try {
    const batch = writeBatch(firestore)

    const collectionPath = collection(firestore, collections.COMMENTS.id)
    const commentDocRef = doc(collectionPath)
    const postDocRef = doc(firestore, collections.POSTS.id, newComment.postId)

    newComment = {
      ...newComment,
      id: commentDocRef.id
    }

    batch.set(commentDocRef, newComment)
    batch.update(postDocRef, {
      numberOfComments: increment(1)
    })
    await batch.commit()

    newComment = {
      ...newComment,
      createdAt: { seconds: Date.now() / 1000 } as Timestamp
    }

    return {
      data: newComment,
      err: ''
    }
  } catch (e: any) {
    console.error('Handle comment', e.message)

    return {
      data: null,
      err: 'Fail to send comment'
    }
  }

}

const deleteComment = async (cid: string, pid: string) => {
  // cid = commentId

  try {
    const batch = writeBatch(firestore)

    const commentDocRef = doc(firestore, collections.COMMENTS.id, cid)
    batch.delete(commentDocRef)

    const postDocRef = doc(firestore, collections.POSTS.id, pid)
    batch.update(postDocRef, {
      numberOfComments: increment(-1)
    })

    await batch.commit()

    return {
      id: cid,
      err: ''
    }
  } catch (e: any) {
    console.error('Delete comment ', e.message)

    return {
      id: '',
      err: 'Fail to delete comment'
    }
  }
}

const getComments = async (pid: string) => {
  try {
    const collectionPath = collection(firestore, collections.COMMENTS.id)
    const commentQuery = query(
      collectionPath,
      where("postId", "==", pid),
      orderBy("createdAt", "asc")
    )
    const commentsDoc = await getDocs(commentQuery)

    return {
      data: commentsDoc.docs.map(comment => ({ id: comment.id, ...comment.data() })) as comment[],
      err: ''
    }
  } catch (e: any) {
    console.error('Get Comments ', e.message)

    return {
      err: 'Fail to get comments',
      data: null
    }
  }

}

export { handleComment as default, deleteComment, getComments }
