import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react'
import { useRecoilState } from 'recoil'
import { communityData } from '../atoms/communitiesAtoms'
import { communityBankState } from '../atoms/communityBankAtom'
import { getCommunityLike } from '../firebase/commmunityBank'

const useSearchBar = () => {
  const [value, setValue] = useState('')
  const [keyword, setKeyword] = useState('')
  const [communityBank, setCommunityBank] = useRecoilState(communityBankState)
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState('')
  const [result, setResult] = useState({
    title: 'Top Community',
    data: [] as communityData[]
  })

  const topFiveCommunity = useMemo(
    () => communityBank.topCommunity.filter((_, i) => i <= 4),
    [communityBank.topCommunity]
  )
  const communityFound: { title: string; data: communityData[] } = useMemo(
    () =>
      keyword === ''
        ? { title: 'Top Community', data: topFiveCommunity }
        : {
            title: 'Communities',
            data: communityBank.searchedCommunity.filter(
              (community, index) =>
                community.id.startsWith(keyword) ||
                (community.id.endsWith(keyword) && index <= 9)
            )
          },
    [keyword, topFiveCommunity]
  )

  const updateKeyword = useCallback(
    debounce((text: string) => {
      setKeyword(text.replaceAll(' ', '').toLowerCase())
    }, 500),
    []
  )

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    // reset help state
    if (err) setErr('')
    if (!loading) setLoading(true)

    setValue(e.target.value)
    updateKeyword(e.target.value)
  }

  function debounce(cb: (args: string) => void, delay = 1000) {
    let timeout: NodeJS.Timeout

    return (args: string) => {
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        cb(args)
      }, delay)
    }
  }

  const requestFromFirestore = async (keyword: string) => {
    try {
      if (keyword === '') return
      const communityResult = await getCommunityLike(keyword)

      if (communityResult.err && communityFound.data.length === 0)
        return setErr(communityResult.err)

      if (communityResult.data.length === 0) return
      setResult({
        title: 'Communities',
        data: communityResult.data
      })

      const searchedCommunity = [
        ...communityResult.data,
        ...communityBank.searchedCommunity
      ].filter(
        (value, index, self) => index === self.findIndex(i => i.id === value.id)
      )

      setCommunityBank(prev => ({
        ...prev,
        searchedCommunity
      }))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    setResult(communityFound)
    if (communityFound.data.length <= 10) {
      requestFromFirestore(keyword)
      return
    }

    setLoading(false)
  }, [communityFound.data])

  return {
    value,
    handleSearch,
    result,
    loading,
    err
  }
}

export default useSearchBar
