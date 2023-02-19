import CreateComunityModal from '@/components/modals/createCommunityModal'
import { Flex, MenuItem } from '@chakra-ui/react'
import { useState } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'

export default function ComunityListItem() {
  const [isOpen, setOpen] = useState(false)

  return (
    <>
      <CreateComunityModal isOpen={isOpen} onClose={() => setOpen(false)} />
      <MenuItem fontWeight="medium" onClick={() => setOpen(true)}>
        <Flex align="center" fontSize="10pt">
          <AiOutlinePlus fontSize="20pt" style={{ marginRight: '2px' }} />
          Create Community
        </Flex>
      </MenuItem>
    </>
  )
}
