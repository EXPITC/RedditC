import { useRouter } from "next/router"
import { useEffect } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { FaReddit } from "react-icons/fa"
import { useRecoilState, useRecoilValue } from "recoil"
import { communitySubsState } from "../atoms/communitiesAtoms"
import communityMenuState, { defaultMenuItem, menuListItem } from "../atoms/communityMenuAtoms"
import { auth } from "../firebase/clientApp"
import { getUserCommunitySubs } from "../firebase/communityData"



const useCommunityMenu = () => {
  const router = useRouter()
  const [user] = useAuthState(auth)
  const [communityMenu, setCommunityMenu] = useRecoilState(communityMenuState)
  const [communitySubs, setCommunitySubs] = useRecoilState(communitySubsState)
  const { currentCommunity, totalSubs } = communitySubs

  const toggleCommunityMenu = () => setCommunityMenu(prev => ({ ...prev, isOpen: !prev.isOpen }))

  const onSelectMenuItem = (Menu: menuListItem) => {
    setCommunityMenu(prev => ({
      ...prev,
      currentMenuItem: Menu
    }))
    if (communityMenu.isOpen) toggleCommunityMenu()
  }

  // for reset when not in community page (lifecylce)
  useEffect(() => {
    const { communityID } = router.query

    if (!communityID) return setCommunityMenu(prev => ({
      ...prev,
      currentMenuItem: defaultMenuItem
    }))
  }, [router.query])

  // for sync with current community that user visit
  useEffect(() => {
    if (!currentCommunity.id || communityMenu.currentMenuItem.displayText === currentCommunity.communityName) return

    setCommunityMenu(prev => ({
      ...prev,
      currentMenuItem: {
        displayText: currentCommunity.communityName,
        icon: FaReddit,
        link: currentCommunity.id,
        iconColor: "brand.100",
        imageUrl: currentCommunity.imageUrl
      }
    }))
  }, [currentCommunity])

  const populateSubsList = async () => {
    const subs = user ? await getUserCommunitySubs(user.uid) : null

    if (!subs) return
    if (subs.length === 0) return setCommunitySubs(prev => ({ ...prev, totalSubs: 0 }))

    setCommunitySubs(prev => ({
      ...prev,
      totalSubs: subs.length,
      subs
    }))
  }

  useEffect(() => {
    if (user && communitySubs.totalSubs === -1) populateSubsList()
  }, [])

  return {
    communityMenu,
    setCommunityMenu,
    toggleCommunityMenu,
    onSelectMenuItem
  }
}

export default useCommunityMenu
