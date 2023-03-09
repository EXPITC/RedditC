import {
  collection,
  CollectionReference,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  QueryDocumentSnapshot,
  QueryFieldFilterConstraint,
  QueryLimitConstraint,
  QueryOrderByConstraint,
  startAfter,
  where
} from 'firebase/firestore'
import { Post } from '../atoms/postsAtom'
import { firestore } from './clientApp'
import collections from './firestoreCollectionsID'

const packPostToObject = (doc: QueryDocumentSnapshot<DocumentData>) => ({
  id: doc.id,
  ...doc.data()
})

const getUserHomeFeed = async (subsId: string[], lastPostId?: string) => {
  // ingredients
  const collectionPath = collection(firestore, collections.POSTS.id)
  // https://firebase.google.com/docs/firestore/query-data/query-cursors
  const keyword: [
    CollectionReference<DocumentData>,
    QueryFieldFilterConstraint,
    QueryOrderByConstraint,
    QueryLimitConstraint
  ] = [
    collectionPath,
    where('communityId', 'in', subsId),
    orderBy('createdAt', 'desc'),
    limit(20)
  ]

  try {
    if (!lastPostId) {
      const firstPostsQuery = query(...keyword)
      const postSnapshots = await getDocs(firstPostsQuery)

      return {
        err: '',
        data: postSnapshots.docs.map(packPostToObject) as Post[]
      }
    }

    const lastPost = await getDoc(doc(collectionPath, lastPostId))
    const nextPostQuery = query(...keyword, startAfter(lastPost))

    const nextPostSnapshots = await getDocs(nextPostQuery)

    return {
      err: '',
      data: nextPostSnapshots.docs.map(packPostToObject) as Post[]
    }
  } catch (e: any) {
    console.error('getNoUserHomeFeed', e.message)

    return {
      err: 'Fail to get home feed please try again'
    }
  }
}

const getNoUserHomeFeed = async (lastPostId?: string) => {
  // ingredients
  const collectionPath = collection(firestore, collections.POSTS.id)
  // https://firebase.google.com/docs/firestore/query-data/query-cursors
  const keyword: [
    CollectionReference<DocumentData>,
    QueryOrderByConstraint,
    QueryLimitConstraint
  ] = [collectionPath, orderBy('vote', 'desc'), limit(20)]

  try {
    if (!lastPostId) {
      const firstPostsQuery = query(...keyword)
      const postSnapshots = await getDocs(firstPostsQuery)

      return {
        err: '',
        data: postSnapshots.docs.map(packPostToObject) as Post[]
      }
    }

    const lastPost = await getDoc(doc(collectionPath, lastPostId))
    const nextPostQuery = query(...keyword, startAfter(lastPost))

    const nextPostSnapshots = await getDocs(nextPostQuery)

    return {
      err: '',
      data: nextPostSnapshots.docs.map(packPostToObject) as Post[]
    }
  } catch (e: any) {
    console.error('getNoUserHomeFeed', e.message)

    return {
      err: 'Fail to get home feed please try again'
    }
  }
}

export { getUserHomeFeed, getNoUserHomeFeed }
