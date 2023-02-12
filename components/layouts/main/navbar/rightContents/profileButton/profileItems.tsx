import { auth } from "@/libs/firebase/clientApp";
import { Divider, Flex, MenuItem } from "@chakra-ui/react";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { CiLogout, CiLogin } from 'react-icons/ci'
import { CgProfile } from 'react-icons/cg'
import { SetterOrUpdater, useSetRecoilState } from "recoil";
import { authModalState } from "@/libs/atoms/authModalAtoms";


const LoginItem = ({ signOut }: { signOut: () => void }) => (
  <>
    <Flex px="20px" pt="2" align="center" fontSize="10pt" color="gray.500">
      <CgProfile fontSize="15pt" style={{ marginRight: '10px', }} />
      My Stuff
    </Flex>
    <MenuItem textAlign="center" fontSize="10pt" fontWeight="semibold" pl="50px" my="2" py="3">
      Profile
    </MenuItem>
    <Divider />
    <MenuItem textAlign="center" fontSize="10pt" px="15pt" fontWeight="semibold" my="2" py="3" onClick={() => signOut()}>
      <CiLogout fontSize="15pt" style={{ marginRight: '10px' }} />
      Logout
    </MenuItem>
  </>
)

const UnLoginItem = ({ setAuthModal }: { setAuthModal: SetterOrUpdater<authModalState> }) => (
  <>
    <MenuItem>
      Profile
    </MenuItem>
    <Divider />
    <MenuItem textAlign="center" fontSize="10pt" px="15pt" fontWeight="semibold" my="2" py="3" onClick={() => setAuthModal({ open: true, view: 'Login' })} >
      <CiLogin fontSize="15pt" style={{ marginRight: '10px' }} />
      Log In / Sign Up
    </MenuItem>
  </>
)

export default function ProfileItems() {
  const [signOut] = useSignOut(auth)
  const [user, _loading, _error] = useAuthState(auth)
  const setAuthModal = useSetRecoilState(authModalState)


  return (
    <>
      {user ?
        <LoginItem signOut={signOut} />
        :
        <UnLoginItem setAuthModal={setAuthModal} />
      }
    </>
  )
}
