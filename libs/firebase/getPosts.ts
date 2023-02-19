import { collection, CollectionReference, QueryDocumentSnapshot, DocumentData, getDocs, limit, orderBy, QueryOrderByConstraint, query, QueryFieldFilterConstraint, where, QueryLimitConstraint, startAfter, doc, getCountFromServer, Query, getDoc } from "firebase/firestore"
import { ref } from "firebase/storage"
import { Post } from "../atoms/postsAtom"
import { firestore } from "./clientApp"
import collections from "./firestoreCollectionsID"




const getPosts = async (communityId: string, lastPostId?: string | null) => {

  const collectionPath = collection(firestore, collections.POSTS.id)
  // https://firebase.google.com/docs/firestore/query-data/query-cursors
  const keyword: [CollectionReference<DocumentData>, QueryFieldFilterConstraint, QueryOrderByConstraint, QueryLimitConstraint] = [
    collectionPath,
    where('communityId', '==', communityId),
    orderBy('createdAt', 'desc'),
    limit(20)
  ]
  const thisPostCommunity = query(collectionPath, where('communityId', '==', communityId))
  const packPostToObject = (doc: QueryDocumentSnapshot<DocumentData>) => ({ id: doc.id, ...doc.data() })

  try {
    const snapshot = await getCountFromServer(thisPostCommunity)

    if (!lastPostId) {
      const firstPostQuery = query(...keyword)
      const postSnapshots = await getDocs(firstPostQuery)

      return {
        totalCollections: snapshot.data().count,
        data: postSnapshots.docs.map(packPostToObject) as Post[]
      }
    }

    // get last post from db
    const lastPost = await getDoc(doc(collectionPath, lastPostId))
    // add last post to query
    const nextPostQuery = query(...keyword, startAfter(lastPost))
    // get from 20 more after last post from db
    const nextPost = await getDocs(nextPostQuery)

    return {
      totalCollections: snapshot.data().count,
      data: nextPost.docs.map(packPostToObject) as Post[]
    }

  } catch (e: any) {
    console.error(e.message)

    throw new Error('Fail to fetch the posts')
  }
}


export default getPosts
