import { doc, updateDoc } from 'firebase/firestore'
import { getDownloadURL, ref, uploadString } from 'firebase/storage'
import { firestore, storage } from './clientApp'
import collections from './firestoreCollectionsID'

const uploadCommunityProfile = async (communityId: string, imgData: string) => {
  // await new Promise(resolve => setTimeout(resolve, 5000));
  try {
    if (imgData.search(/svg/) === 11)
      return {
        err: "Fail to upload for security reason we don't accept svg file.",
        serverImgUrl: ''
      }

    const imgRef = ref(
      storage,
      `${collections.COMMUNITIES.id}/${communityId}/${collections.COMMUNITIES.storage.image.id}`
    )

    await uploadString(imgRef, imgData, 'data_url')
    const serverImgUrl = await getDownloadURL(imgRef)

    const communityCollection = doc(
      firestore,
      collections.COMMUNITIES.id,
      communityId
    )
    await updateDoc(communityCollection, {
      imageUrl: serverImgUrl
    })

    return {
      err: '',
      serverImgUrl
    }
  } catch (e: any) {
    console.error('upload community profile', e.message)

    return {
      err: 'Fail to upload community profile',
      serverImgUrl: ''
    }
  }
}

export default uploadCommunityProfile
