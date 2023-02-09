import { atom } from "recoil"

export interface authModalState {
  open: boolean,
  view: 'Login' | 'Sign Up' | 'Reset Password'
}

const defaultModalState: authModalState = {
  open: false,
  view: 'Login'
}

export const authModalState = atom<authModalState>({
  key: 'authModalState',
  default: defaultModalState
})
