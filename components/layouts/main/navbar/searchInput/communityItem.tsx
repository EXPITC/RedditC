import { communityData } from '@/libs/atoms/communitiesAtoms'
import formatNumber from '@/libs/formatNumber'
import { Box, Icon, Stack, Text } from '@chakra-ui/react'
import Image from 'next/image'
import Link from 'next/link'
import { BsDot } from 'react-icons/bs'

// id: string
// communityName: string,
// imageUrl: string,
// createdAt: {
//   seconds: number
//   nanoseconds: number
// }
// creatorId: string
// numberOfmember: number
// intractedUserId: string[],
// privacyType: string

interface communityItemType extends communityData {
  handleClose: () => void
}

const CommunityItem = ({
  id,
  imageUrl,
  communityName,
  numberOfmember,
  handleClose
}: communityItemType) => (
  <Stack
    as={Link}
    href={'/r/' + id}
    onClick={handleClose}
    cursor="pointer"
    direction="row"
    align="center"
    spacing="2"
    _hover={{ bg: 'gray.100' }}
    py="4px"
    px="12px"
  >
    <Image
      src={imageUrl ? imageUrl : '/images/redditFace.svg'}
      width={35}
      height={35}
      alt="community profile"
      style={{ borderRadius: '50%' }}
      priority
    />

    <Box>
      <Text fontWeight="semibold">r/{communityName}</Text>
      <Text color="gray.500" fontWeight="normal" fontSize="9pt">
        Community
        <Icon as={BsDot} />
        {formatNumber(numberOfmember)} members
      </Text>
    </Box>
  </Stack>
)

export default CommunityItem
