import { atom } from 'recoil'

export const infoModalState = atom<boolean>({
  key: 'infoModalState',
  default: false
})
