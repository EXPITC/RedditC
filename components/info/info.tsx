import { Alert, AlertDescription, AlertIcon, Box, Button, Divider, Flex, Icon, Input, Stack, Text } from "@chakra-ui/react"
import { HiOutlineDotsHorizontal } from 'react-icons/hi'
import { GiCakeSlice } from 'react-icons/gi'
import moment from "moment"
import { useRouter } from "next/router"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "@/libs/firebase/clientApp"
import { useSetRecoilState } from "recoil"
import { authModalState } from "@/libs/atoms/authModalAtoms"
import { GoPrimitiveDot } from 'react-icons/go'
import useSelectImage from "@/libs/hooks/useSelectImage"
import Image from "next/image"
import { ChangeEvent, useEffect, useRef, useState } from "react"
import uploadCommunityProfile from "@/libs/firebase/uploadCommunityProfile"
import communityMenuState from "@/libs/atoms/communityMenuAtoms"
import useCommunityData from "@/libs/hooks/useCommunityData"
import formatNumber from "@/libs/formatNumber"



const Info = ({ communityIdFetch = false }: { communityIdFetch?: boolean }) => {
  const router = useRouter()
  let { communityID } = router.query
  communityID = typeof communityID === 'string' ? communityID.toLowerCase() : ''//just for safety

  //core data
  const [user] = useAuthState(auth)
  const setAuthModal = useSetRecoilState(authModalState)
  const setCommunityMenu = useSetRecoilState(communityMenuState)
  const { communitySubs, setCommunitySubs } = useCommunityData(communityIdFetch ? communityID : '')
  const communityData = communitySubs.currentCommunity

  //Handle the image input variable
  const { imgUrl, setImgUrl, convertToDataUrlAndSaveToImgUrl, err: errHook } = useSelectImage()
  const communityProfile = imgUrl || communityData.imageUrl
  const ref = useRef<HTMLInputElement>(null)

  const [err, setErr] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setErr(errHook)
  }, [errHook])

  const handleClick = () => {
    if (!user) return setAuthModal({ open: true, view: 'Login' })
    router.push(`/r/${communitySubs.currentCommunity.id}/submit`)
  }

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      convertToDataUrlAndSaveToImgUrl(e.target.files[0])
    }
  }

  const upload = async () => {
    if (!imgUrl) return
    const prevImg = communitySubs.currentCommunity.imageUrl
    const selectedImgUrl = imgUrl

    try {
      setLoading(true)
      setCommunitySubs(prev => ({
        ...prev,
        subs: [...prev.subs.filter(sub => sub.communityId !== communityID), { ...prev.subs.find(sub => sub.communityId === communityID)!, imageUrl: imgUrl }],
        currentCommunity: {
          ...prev.currentCommunity,
          imageUrl: imgUrl
        }
      }))
      setCommunityMenu(prev => ({
        ...prev,
        currentMenuItem: {
          ...prev.currentMenuItem,
          imageUrl: imgUrl
        }
      }))

      if (err) setErr('')
      const uploadToDB = await uploadCommunityProfile(communityData.id, selectedImgUrl)

      if (uploadToDB.err) {
        setErr(uploadToDB.err)
        setCommunitySubs(prev => ({
          ...prev,
          subs: [...prev.subs.filter(sub => sub.communityId !== communityID), { ...prev.subs.find(sub => sub.communityId === communityID)!, imageUrl: prevImg }],
          currentCommunity: {
            ...prev.currentCommunity,
            imageUrl: prevImg
          }
        }))
        setCommunityMenu(prev => ({
          ...prev,
          currentMenuItem: {
            ...prev.currentMenuItem,
            imageUrl: prevImg
          }
        }))
      }

    } finally {
      setImgUrl('')
      setLoading(false)
    }
  }

  return (
    <Box position="sticky" top="14px" borderRadius="4px" overflow="hidden" bg="white" border="1px solid" borderColor="gray.300">
      <Flex align="center" justify="space-between" bg="purple.500" color="white" p="12px 12px">
        <Text fontSize="10pt" fontWeight="bold" letterSpacing="wider">About Community</Text>
        <HiOutlineDotsHorizontal />
      </Flex>
      <Stack p="12px" >
        <Text fontSize="14px" pb="4px" >Description not provide.</Text>

        <Flex >
          <GiCakeSlice fontSize="20px" />
          <Text fontSize="14px" ml="8pt" color="gray.500" fontWeight="normal">Created at {moment(new Date(communityData.createdAt.seconds * 1000)).format('MMM DD, YYYY')}</Text>
        </Flex>

        <Flex py="8px" justify="center" align="center">
          <Divider borderColor="gray.300" />
        </Flex>

        <Flex align="center"  >
          <Box mr="60px">
            <Text fontSize="16px">{formatNumber(communityData.numberOfmember)}</Text>
            <Text fontSize="12px" color="gray.500">Members</Text>
          </Box>
          <Box>
            <Flex align="center" fontSize="16px">
              <Icon as={GoPrimitiveDot} color="green.300" />
              <Text>{communityData.numberOfmember}</Text>
            </Flex>
            <Text fontSize="12px" color="gray.500">Online</Text>
          </Box>
        </Flex>

        <Flex py="8px" justify="center" align="center">
          <Divider borderColor="gray.300" />
        </Flex>

        <Flex justify="center">
          <Button onClick={handleClick} h="34px" flexGrow="1">Create new post</Button>
        </Flex>

        {communitySubs.subs.find(sub => sub.communityId === communityID)?.isModerator && (
          <>
            <Flex py="8px" justify="center" align="center">
              <Divider borderColor="gray.300" />
            </Flex>

            <Flex justify="space-between">
              {imgUrl ?
                <Flex>
                  <Button
                    onClick={upload}
                    fontSize="9pt"
                    color="purple.500"
                    bg="unset"
                    p="0"
                    _hover={{
                      bg: "unset",
                      textDecor: 'underline'
                    }}
                  >
                    Save
                  </Button>
                  <Button
                    onClick={() => { setImgUrl(''); if (err) setErr('') }}
                    fontSize="9pt"
                    color="purple.500"
                    bg="unset"
                    p="0"
                    _hover={{
                      bg: "unset",
                      textDecor: 'underline'
                    }}
                    isLoading={loading}
                  >
                    Cancel
                  </Button>
                </Flex>
                :
                <Button
                  onClick={() => ref.current?.click()}
                  fontSize="9pt"
                  color="purple.500"
                  bg="unset"
                  p="0"
                  _hover={{
                    bg: "unset",
                    textDecor: 'underline'
                  }}
                >
                  Upload Profile
                </Button>
              }
              <Input ref={ref} type="file" accept="Image/*" onChange={handleInput} hidden />
              <Image src={communityProfile ? communityProfile : '/images/redditFace.svg'} width={40} height={40} alt="community profile" style={{ borderRadius: '50%', maxHeight: "40px", maxWidth: "40px" }} />
            </Flex>

            <Flex align="center" justify="center">
            </Flex>

          </>
        )
        }

        {err &&
          < Alert status="error" maxH="30px" borderRadius="4px">
            <AlertIcon fontSize="6pt" />
            <AlertDescription fontSize="6pt">{err}</AlertDescription>
          </Alert>
        }

        <Text color="gray.500" fontSize="9px" fontWeight="semibold">
          {communityData.creatorId === user?.uid && 'Creator'}{' '}
          {communityData.creatorId === user?.uid && communitySubs.subs.find(sub => sub.communityId === communityID)?.isModerator && '&'}{' '}
          {communitySubs.subs.find(sub => sub.communityId === communityID)?.isModerator && 'Admin'}{' '}
          r/{communityData.id}
        </Text>
      </Stack>
    </Box >
  )
}



export default Info
