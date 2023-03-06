import { atom } from "recoil"
import { communityData } from "./communitiesAtoms"


interface communityBankState {
  topCommunity: communityData[],
  searchedCommunity: communityData[]
}


const defaultCommunityBank: communityBankState = {
  topCommunity: [],
  searchedCommunity: []
}

export const communityBankState = atom<communityBankState>({
  key: 'communityBank',
  default: defaultCommunityBank
})
