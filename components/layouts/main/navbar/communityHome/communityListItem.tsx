import CreateComunityModal from '@/components/modals/createCommunityModal'
import { communitySubsState } from '@/libs/atoms/communitiesAtoms'
import { Box, Flex, MenuItem, Text } from '@chakra-ui/react'
import { useState } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import { FaReddit } from 'react-icons/fa'
import { useRecoilValue } from 'recoil'
import MenuListItem from './communityListItem/menuListItem'

export default function ComunityListItem() {
  const [isOpen, setOpen] = useState(false)
  const subs = useRecoilValue(communitySubsState).subs

  return (
    <>
      <CreateComunityModal isOpen={isOpen} onClose={() => setOpen(false)} />
      <Box mt="3" mb="4">
        <Text
          pl="3"
          mb="1"
          fontSize="7pt"
          fontWeight="semibold"
          color="gray.500"
        >
          MODERATING
        </Text>
      </Box>
      {subs
        .filter(sub => sub.isModerator)
        .map(sub => (
          <MenuListItem
            key={sub.communityId}
            displayText={sub.communityName}
            icon={FaReddit}
            link={sub.communityId}
            iconColor="brand.100"
            imageUrl={sub.imageUrl}
          />
        ))}
      <Box mt="3" mb="4">
        <Text
          pl="3"
          mb="1"
          fontSize="7pt"
          fontWeight="semibold"
          color="gray.500"
        >
          YOUR COMMUNITIES
        </Text>
      </Box>
      <MenuItem fontWeight="medium" onClick={() => setOpen(true)}>
        <Flex align="center" fontSize="10pt">
          <AiOutlinePlus fontSize="20pt" style={{ marginRight: '2px' }} />
          Create Community
        </Flex>
      </MenuItem>
      {subs
        .filter(sub => !sub.isModerator)
        .map(sub => (
          <MenuListItem
            key={sub.communityId}
            displayText={sub.communityName}
            icon={FaReddit}
            link={sub.communityId}
            iconColor="brand.100"
            imageUrl={sub.imageUrl}
          />
        ))}
    </>
  )
}
