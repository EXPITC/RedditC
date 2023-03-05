import useCommunityData from '@/libs/hooks/useCommunityData'
import { Box, Flex, Text } from '@chakra-ui/react'
import Head from 'next/head'
import Image from 'next/image'
import ButtonJoinLeave from '../buttonJoinLeave'


const Header = () => {
  const { isJoin, joinOrleaveCommunity, loading, communitySubs } = useCommunityData()
  const communityName = communitySubs.currentCommunity.communityName
  const communityId = communitySubs.currentCommunity.id

  return (
    <>
      <Head>
        <title>{`${communityName}`}</title>
      </Head>
      <Box height="164px">
        <Box bg="purple.500" h="50%" w="full" />
        <Flex flexGrow="1" h="50%" bg="white" justify="center">
          <Flex width="95%" maxWidth="976px" mt="-14px" mb="12px">
            <Box>
              <Image
                src={communitySubs.currentCommunity.imageUrl ? communitySubs.currentCommunity.imageUrl : "/images/redditFace.svg"}
                alt="community logo"
                style={{ border: '4px solid white', borderRadius: '100%' }}
                width={72}
                height={72}
              />
            </Box>
            <Flex pl="16px" mt="24px">
              <Flex direction="column" pr="24px">
                <Text fontWeight="800" fontSize="16pt">
                  {communityName}
                </Text>
                <Text fontWeight="600" fontSize="10pt" color="gray.500">
                  r/{communityId}
                </Text>
              </Flex>
              <ButtonJoinLeave
                isJoin={isJoin(communityId)}
                loading={communitySubs.totalSubs === -1 ? true : false || loading}
                handleClick={() => joinOrleaveCommunity(communityId, communityName)}
              />
            </Flex>
          </Flex>
        </Flex>
      </Box>
    </>
  )
}

export default Header
