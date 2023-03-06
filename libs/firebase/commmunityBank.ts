import { limit, collection, CollectionReference, DocumentData, orderBy, QueryLimitConstraint, QueryOrderByConstraint, query, getDocs, getDoc, startAfter, doc, QueryDocumentSnapshot } from "firebase/firestore"
import { communityData } from "../atoms/communitiesAtoms"
import { firestore } from "./clientApp"
import collections from "./firestoreCollectionsID"


export const getTopCommunity = async (lastCommunityId: string | undefined) => {
  const communityCollectionPath = collection(firestore, collections.COMMUNITIES.id)

  const keyword: [
    CollectionReference<DocumentData>,
    QueryOrderByConstraint,
    QueryLimitConstraint
  ] = [
      communityCollectionPath,
      orderBy('numberOfmember', 'desc'),
      limit(5)
    ]

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

    const lastCommunity = await getDoc(doc(communityCollectionPath, lastCommunityId))

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

export const searchCommunity = async () => { }
