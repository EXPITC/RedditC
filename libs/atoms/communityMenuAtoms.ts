import { IconType } from "react-icons"
import { AiFillHome } from "react-icons/ai"
import { atom } from "recoil"


export interface menuListItem {
  displayText: string
  link: string
  icon: IconType
  iconColor: string
  imageUrl?: string
}

interface communityMenuState {
  isOpen: boolean,
  currentMenuItem: menuListItem
}

export const defaultMenuItem: menuListItem = {
  displayText: 'Home',
  link: '/',
  icon: AiFillHome,
  iconColor: 'black',
  imageUrl: ''
}

const defaultCommunityMenuState: communityMenuState = {
  isOpen: false,
  currentMenuItem: defaultMenuItem
}


const communityMenuState = atom<communityMenuState>({
  key: 'communityMenuState',
  default: defaultCommunityMenuState
})


export default communityMenuState
