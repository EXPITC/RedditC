import {
  collection,
  CollectionReference,
  QueryDocumentSnapshot,
  DocumentData,
  getDocs,
  limit,
  orderBy,
  QueryOrderByConstraint,
  query,
  QueryFieldFilterConstraint,
  where,
  QueryLimitConstraint,
  startAfter,
  doc,
  getCountFromServer,
  getDoc
} from 'firebase/firestore'
import { Post } from '../atoms/postsAtom'
import { firestore } from './clientApp'
import collections from './firestoreCollectionsID'

const getPosts = async (communityId: string, lastPostId?: string | null) => {
  const collectionPath = collection(firestore, collections.POSTS.id)
  // https://firebase.google.com/docs/firestore/query-data/query-cursors
  const keyword: [
    CollectionReference<DocumentData>,
    QueryFieldFilterConstraint,
    QueryOrderByConstraint,
    QueryLimitConstraint
  ] = [
      collectionPath,
      where('communityId', '==', communityId),
      orderBy('createdAt', 'desc'),
      limit(20)
    ]
  const thisPostCommunity = query(
    collectionPath,
    where('communityId', '==', communityId)
  )
  const packPostToObject = (doc: QueryDocumentSnapshot<DocumentData>) => ({
    id: doc.id,
    ...doc.data()
  })

  try {
    const snapshot = await getCountFromServer(thisPostCommunity)

    if (!lastPostId) {
      const firstPostQuery = query(...keyword)
      const postSnapshots = await getDocs(firstPostQuery)

      return {
        err: '',
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
      err: '',
      totalCollections: snapshot.data().count,
      data: nextPost.docs.map(packPostToObject) as Post[]
    }
  } catch (e: any) {
    console.error('get posts', e.message)

    return {
      err: 'Fail to fetch new post, you can try to refresh your page, if the issue still occur you can contact EXPITC for further investigation',
      totalCollections: 0,
      data: []
    }
  }
}

export default getPosts
