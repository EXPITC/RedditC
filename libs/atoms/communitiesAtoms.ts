import { atom } from 'recoil'

export type communitySub = {
  communityId: string
  communityName: string
  isModerator: boolean
}

export interface communitySubsCollection extends Array<communitySub> {}

export const communitySubsState = atom<communitySubsCollection>({
  key: 'communitySubsState',
  default: []
})
