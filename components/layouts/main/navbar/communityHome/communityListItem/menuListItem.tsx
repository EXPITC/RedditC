import { menuListItem } from '@/libs/atoms/communityMenuAtoms'
import useCommunityMenu from '@/libs/hooks/useCommunityMenu'
import { Flex, Icon, MenuItem } from '@chakra-ui/react'
import Image from 'next/image'
import Link from 'next/link'

const MenuListItem = (menu: menuListItem) => {
  const { displayText, link, icon, iconColor, imageUrl } = menu
  const { onSelectMenuItem } = useCommunityMenu()

  return (
    <MenuItem
      w="100%"
      fontSize="10pt"
      _hover={{ bg: 'gray.100' }}
      onClick={() => onSelectMenuItem(menu)}
      as={Link}
      href={`/r/${link}`}
    >
      <Flex align="center">
        {imageUrl ? (
          <Image
            src={imageUrl}
            width={20}
            height={20}
            alt="community profile"
            style={{ marginRight: '8px', borderRadius: '50%' }}
          />
        ) : (
          <Icon as={icon} fontSize="20" mr="8px" color={iconColor} />
        )}
        r/{displayText}
      </Flex>
    </MenuItem>
  )
}
export default MenuListItem
