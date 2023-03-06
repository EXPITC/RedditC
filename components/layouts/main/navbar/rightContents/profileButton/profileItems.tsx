import { auth } from '@/libs/firebase/clientApp'
import { Divider, Flex, MenuItem } from '@chakra-ui/react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { CiLogout, CiLogin } from 'react-icons/ci'
import { CgProfile } from 'react-icons/cg'
import { SetterOrUpdater, useResetRecoilState, useSetRecoilState } from 'recoil'
import { authModalState } from '@/libs/atoms/authModalAtoms'
import { signOut } from 'firebase/auth'
import { communitySubsState } from '@/libs/atoms/communitiesAtoms'
import { defaultPostState, postState } from '@/libs/atoms/postsAtom'
import { useRouter } from 'next/router'

const LoginItem = ({ signOut }: { signOut: () => void }) => (
  <>
    <Flex px="20px" pt="2" align="center" fontSize="10pt" color="gray.500">
      <CgProfile fontSize="15pt" style={{ marginRight: '10px' }} />
      My Stuff
    </Flex>
    <MenuItem
      textAlign="center"
      fontSize="10pt"
      fontWeight="semibold"
      pl="50px"
      my="2"
      py="3"
    >
      Profile
    </MenuItem>
    <Divider />
    <MenuItem
      onClick={signOut}
      textAlign="center"
      fontSize="10pt"
      px="15pt"
      fontWeight="semibold"
      my="2"
      py="3"
    >
      <CiLogout fontSize="15pt" style={{ marginRight: '10px' }} />
      Logout
    </MenuItem>
  </>
)

const UnLoginItem = ({
  setAuthModal
}: {
  setAuthModal: SetterOrUpdater<authModalState>
}) => (
  <>
    <MenuItem>Profile</MenuItem>
    <Divider />
    <MenuItem
      textAlign="center"
      fontSize="10pt"
      px="15pt"
      fontWeight="semibold"
      my="2"
      py="3"
      onClick={() => setAuthModal({ open: true, view: 'Login' })}
    >
      <CiLogin fontSize="15pt" style={{ marginRight: '10px' }} />
      Log In / Sign Up
    </MenuItem>
  </>
)

export default function ProfileItems() {
  const [user, _loading, _error] = useAuthState(auth)
  const setAuthModal = useSetRecoilState(authModalState)
  const setCommunitySubs = useSetRecoilState(communitySubsState)
  const setPostState = useSetRecoilState(postState)
  const { communityID } = useRouter().query

  const logout = async () => {
    await signOut(auth)
    setCommunitySubs(prev => ({
      ...prev,
      totalSubs: -1,
      subs: [],
    }))
    // if logout in community page then do not reset the post
    if (communityID) return setPostState(prev => ({
      ...prev,
      userVotePost: []
    }))
    // if logout in homepage we must show for non user 
    setPostState(defaultPostState)
  }

  return (
    <>
      {user ? (
        <LoginItem signOut={logout} />
      ) : (
        <UnLoginItem setAuthModal={setAuthModal} />
      )}
    </>
  )
}
