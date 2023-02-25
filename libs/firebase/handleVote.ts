import {
  writeBatch,
  doc,
  increment,
  getDocs,
  collection,
  deleteDoc,
  getDoc,
  arrayUnion
} from 'firebase/firestore'
import { votePost } from '../atoms/postsAtom'
import collections from '../firebase/firestoreCollectionsID'
import { firestore } from './clientApp'

type handleVoteProps = (
  userId: string,
  voteData: votePost,
  n: number,
  userAlreadyInteracted: string | undefined | false
) => Promise<{ err: string; vote: number }>

const handleVote: handleVoteProps = async (userId, voteData, n, userAlreadyInteracted) => {

  const userVotePath = `${collections.USERS.id}/${userId}/${collections.USERS.VOTEPOST.id}`
  const postVotePath = `${collections.POSTS.id}`
  const userVote = doc(firestore, userVotePath, voteData.postId)
  const postVote = doc(firestore, postVotePath, voteData.postId)
  const communityVoteDoc = doc(firestore, collections.COMMUNITIES.id, voteData.communityId.toLowerCase())

  const vote = voteData.vote * -1 + n
  // First press up = 1
  // First press down = -1
  // Position up Press down = -2
  // Position down Press up = 2
  // Position up Press up = 0
  // Position down Press down = 0

  try {
    const batch = writeBatch(firestore)

    //Delete
    if (voteData.vote === n) {
      // Bring back to zero
      // delete user vote
      batch.delete(userVote)
      // bring back the existency of post vote value to neutral 0
      batch.update(postVote, {
        vote: increment(n * -1),
      })
    }

    //Create
    if (voteData.vote != n) {
      // Modify/set value
      batch.set(userVote, {
        ...voteData,
        vote: n,
      })

      //record new intracted userId 
      if (!userAlreadyInteracted) {
        // if there is not currentCommunity in state we retrive intractedUserId data from firebase
        const checkInFirestore = async () => {
          const communityData = await getDoc(communityVoteDoc)

          return communityData.data()!.intractedUserId.find((prevUserId: string) => prevUserId === userId)
        }

        if (userAlreadyInteracted === false)
          // update the value userAlreadyInteracted by db data 
          userAlreadyInteracted = await checkInFirestore()

        if (!userAlreadyInteracted) {
          batch.update(communityVoteDoc, {
            intractedUserId: arrayUnion(userId)
          })
        }
      }

      batch.update(postVote, {
        vote: increment(vote),
      })
    }
    await batch.commit()

    return {
      err: '',
      vote: vote === 0 ? n * -1 : vote
    }
  } catch (e: any) {
    console.error('add vote err', e.message)

    return {
      err: 'Fail to vote',
      vote: 0
    }
  }
}

const getUserVote = async (userId: string) => {
  try {
    const userVotePath = `${collections.USERS.id}/${userId}/${collections.USERS.VOTEPOST.id}`
    const userVoteCollection = collection(firestore, userVotePath)
    const voteDocs = await getDocs(userVoteCollection)

    return voteDocs.docs.map(doc => doc.data()) as votePost[]
  } catch (e: any) {
    console.error('get vote', e.message)
  }
}

const deleteVote = async (userId: string, voteId: string) => {
  try {
    const userVotePath = `${collections.USERS.id}/${userId}/${collections.USERS.VOTEPOST.id}`
    const voteDocRef = doc(firestore, userVotePath, voteId)
    await deleteDoc(voteDocRef)

    return {
      err: ''
    }
  } catch (e: any) {
    console.error('delet vote', e.message)
    return {
      err: 'This post already deleted but fail to delete the vote cache, please report to admin with screen shoot of the this message thankyou.'
    }
  }
}

export { handleVote as default, getUserVote, deleteVote }
