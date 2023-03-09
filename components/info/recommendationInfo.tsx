import { communitySubsState } from '@/libs/atoms/communitiesAtoms'
import { auth } from '@/libs/firebase/clientApp'
import useCommunityBank from '@/libs/hooks/useCommunityBank'
import useCommunityData from '@/libs/hooks/useCommunityData'
import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  Button,
  Flex,
  Text
} from '@chakra-ui/react'
import Image from 'next/image'
import Link from 'next/link'
import { useMemo } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useRecoilValue } from 'recoil'
import ButtonJoinLeave from '../buttons/buttonJoinLeave'

const RecommendationInfo = () => {
  const [user] = useAuthState(auth)
  const { communityBank, getNextTopCommunity, loading, err } =
    useCommunityBank()
  const load = useMemo(() => loading, [loading])
  const error = useMemo(() => err, [err])
  const communitySubs = useRecoilValue(communitySubsState)
  const { joinOrleaveCommunity } = useCommunityData()

  return (
    <Box
      bg="white"
      border="1px solid"
      borderColor="gray.300"
      borderRadius="4px"
      overflow="hidden"
    >
      <Flex
        h="90px"
        p="6px 10px"
        align="flex-end"
        color="white"
        fontWeight="bold"
        whiteSpace="nowrap"
        backgroundSize="cover"
        backgroundRepeat="repeat-y"
        backgroundPosition="bottom"
        bgGradient="linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,0.75)), url(/images/hangoutsscreen.jpg)"
      >
        Top Communities
      </Flex>
      {communityBank.topCommunity.map((c, index) => (
        <Flex
          key={c.id + index}
          align="center"
          py="2"
          px="4"
          borderY="0.5px solid"
          borderColor="gray.200"
        >
          <Flex w="10%">
            <Text>{index + 1}</Text>
          </Flex>
          <Flex flexGrow="1" justify="space-between">
            <Flex align="center" as={Link} href={'/r/' + c.id}>
              <Image
                src={c.imageUrl ? c.imageUrl : '/images/redditFace.svg'}
                width={35}
                height={35}
                alt="community profile"
                style={{ borderRadius: '50%' }}
                priority
              />
              <Text
                _hover={{
                  textDecoration: 'underline',
                  textDecorationColor: 'purple.500'
                }}
                mx="2"
                fontWeight="semibold"
                whiteSpace="nowrap"
                overflow="hidden"
                textOverflow="ellipsis"
              >
                {c.communityName}
              </Text>
            </Flex>
            <ButtonJoinLeave
              isJoin={
                !!communitySubs.subs.find(
                  communitySubs => communitySubs.communityId === c.id
                )
              }
              loading={
                user
                  ? (communitySubs.totalSubs === -1 && true) || load === c.id
                    ? true
                    : false
                  : false
              }
              handleClick={() => joinOrleaveCommunity(c.id, c.communityName)}
            />
          </Flex>
        </Flex>
      ))}
      {error ? (
        <Alert status="error">
          <AlertIcon />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : (
        communityBank.topCommunity.length < 10 && (
          <Flex justify="center" my="3" px="2">
            <Button
              onClick={getNextTopCommunity}
              h="34px"
              w="full"
              letterSpacing="wider"
            >
              View Top 10
            </Button>
          </Flex>
        )
      )}
    </Box>
  )
}

export default RecommendationInfo
