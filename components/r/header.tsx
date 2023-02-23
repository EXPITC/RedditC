import useCommunityData from '@/libs/hooks/useCommunityData'
import { Box, Button, Flex, Text } from '@chakra-ui/react'
import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'

interface HeaderProps {
  communityId: string
  communityName: string
}

interface ButtonHeaderProps {
  isJoin: boolean
  loading: boolean
  handleClick: () => void
}

const ButtonHeader = ({
  isJoin = false,
  loading,
  handleClick
}: ButtonHeaderProps) => {
  const [joined, setJoined] = useState('Joined')

  return (
    <Button
      onClick={handleClick}
      isLoading={loading}
      fontWeight="700"
      fontSize="11pt"
      minWidth="32px"
      maxHeight="32px"
      w="96px"
      variant={isJoin ? 'outline' : 'solid'}
      onMouseEnter={() => (isJoin ? setJoined('Leave') : null)}
      onMouseLeave={() => (isJoin ? setJoined('Joined') : null)}
    >
      {isJoin ? joined : 'Join'}
    </Button>
  )
}

const Header = ({ communityId, communityName }: HeaderProps) => {
  const { isJoin, joinOrleaveCommunity, loading, communitySubs } = useCommunityData({
    communityId,
    communityName
  })

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
              <ButtonHeader
                isJoin={isJoin}
                loading={loading}
                handleClick={joinOrleaveCommunity}
              />
            </Flex>
          </Flex>
        </Flex>
      </Box>
    </>
  )
}

export default Header
