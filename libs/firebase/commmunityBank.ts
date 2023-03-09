import {
  limit,
  collection,
  CollectionReference,
  DocumentData,
  orderBy,
  QueryLimitConstraint,
  QueryOrderByConstraint,
  query,
  getDocs,
  getDoc,
  startAfter,
  doc,
  QueryDocumentSnapshot,
  startAt,
  endAt
} from 'firebase/firestore'
import { communityData } from '../atoms/communitiesAtoms'
import { firestore } from './clientApp'
import collections from './firestoreCollectionsID'

export const getTopCommunity = async (lastCommunityId: string | undefined) => {
  const communityCollectionPath = collection(
    firestore,
    collections.COMMUNITIES.id
  )

  const keyword: [
    CollectionReference<DocumentData>,
    QueryOrderByConstraint,
    QueryLimitConstraint
  ] = [communityCollectionPath, orderBy('numberOfmember', 'desc'), limit(5)]

  const packToObject = (doc: QueryDocumentSnapshot<DocumentData>) => ({
    id: doc.id,
    ...doc.data()
  })

  try {
    if (!lastCommunityId) {
      const topCommunityQuery = query(...keyword)

      const topCommunityData = await getDocs(topCommunityQuery)

      return {
        err: '',
        data: topCommunityData.docs.map(packToObject) as communityData[]
      }
    }

    const lastCommunity = await getDoc(
      doc(communityCollectionPath, lastCommunityId)
    )

    const nextTopCommunityQuery = query(...keyword, startAfter(lastCommunity))

    const nextTopCommunityData = await getDocs(nextTopCommunityQuery)

    return {
      err: '',
      data: nextTopCommunityData.docs.map(packToObject) as communityData[]
    }
  } catch (e: any) {
    console.error('get top community', e.message)

    return {
      err: 'Fail to get community data',
      data: []
    }
  }
}

export const getCommunityLike = async (keyword: string) => {
  const collectionPath = collection(firestore, collections.COMMUNITIES.id)
  const communityQuery = query(
    collectionPath,
    orderBy('id', 'asc'),
    startAt(keyword),
    endAt(keyword + '\uf8ff'),
    limit(10)
  )
  try {
    const getCommunity = await getDocs(communityQuery)

    if (getCommunity.empty)
      return {
        err: `Sorry community not found... 🧑‍🦽`,
        data: [] as communityData[]
      }

    return {
      err: '',
      data: getCommunity.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as communityData[]
    }
  } catch (e: any) {
    console.log('get community like', e.message)

    return {
      err: 'Fail to search community',
      data: [] as communityData[]
    }
  }
}
