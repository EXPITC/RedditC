import { useEffect, useState } from "react"
import { useRecoilState } from "recoil"
import { communityBankState } from "../atoms/communityBankAtom"
import { getTopCommunity } from "../firebase/commmunityBank"




const useCommunityBank = () => {
  const [communityBank, setCommunityBank] = useRecoilState(communityBankState)
  const [loading, setLoading] = useState('') //string stroe id
  const [err, setErr] = useState('')

  const populateTopCommunity = async (lastCommunity?: string) => {
    setLoading('true')
    try {
      if (err) setErr('')
      const topCommunityData = await getTopCommunity(lastCommunity)

      if (topCommunityData.err) return setErr(topCommunityData.err)

      communityBank.searchedCommunity.map(prevCommunity =>
        topCommunityData.data = topCommunityData.data.filter(community => community.id !== prevCommunity.id)
      )
      setCommunityBank(prev => ({
        ...prev,
        topCommunity: [...prev.topCommunity, ...topCommunityData.data],
        searchedCommunity: [...prev.searchedCommunity, ...topCommunityData.data]
      }))

    } finally {
      setLoading('')
    }
  }


  const getNextTopCommunity = async () => {

    if (communityBank.topCommunity.length >= 10) return

    const lastCommunity = communityBank.topCommunity[communityBank.topCommunity.length - 1]?.id
    await populateTopCommunity(lastCommunity)
  }


  //init
  useEffect(() => {

    if (communityBank.topCommunity.length > 5) return

    populateTopCommunity()
  }, [])

  return {
    communityBank,
    setCommunityBank,
    getNextTopCommunity,
    err,
    loading
  }

}

export default useCommunityBank
