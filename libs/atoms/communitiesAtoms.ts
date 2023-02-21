import { atom } from 'recoil'

export type communitySub = {
  communityId: string
  communityName: string
  isModerator: boolean
}
export type communityData = {
  id: string
  communityName: string,
  imageUrl: string,
  createdAt: {
    seconds: number
    nanoseconds: number
  }
  creatorId: string
  numberOfmember: number
}

export interface communitySubsCollection {
  subs: communitySub[],
  currentCommunity: communityData
}

const defaultCommunitySubs: communitySubsCollection = {
  subs: [],
  currentCommunity: {
    id: '',
    communityName: '',
    imageUrl: '',
    createdAt: {
      seconds: 0,
      nanoseconds: 0
    },
    creatorId: '',
    numberOfmember: 0
  }
}

export const communitySubsState = atom<communitySubsCollection>({
  key: 'communitySubsState',
  default: defaultCommunitySubs
})
