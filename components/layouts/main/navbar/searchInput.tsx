import { Box, Flex, Icon, Input, InputGroup, InputLeftElement, Spinner, Stack, Text } from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'
import { User } from 'firebase/auth'
import useSearchBar from '@/libs/hooks/useSearchBar'
import { useMemo, useState } from 'react'
import CommunityItem from './searchInput/communityItem'
import { RxMagnifyingGlass } from 'react-icons/rx'

interface props {
  user: User | undefined | null
}

export default function SearchInput({ user }: props) {
  const { value, handleSearch, result, err, loading } = useSearchBar()
  const error = useMemo(() => err, [err])
  const load = useMemo(() => loading, [loading])
  const [isFocus, setFocus] = useState(false)
  const [isHover, setHover] = useState(false)



  return (
    <Flex
      flexGrow="1"
      // mx={["1", "2"]}
      maxW={user ? 'auto' : '690px'}
      marginX={["5px", "5px", "5px", "10px", "16px"]}
      h="34px"
      align="center"
    >
      <InputGroup zIndex="modal">
        <InputLeftElement
          pointerEvents="none"
          children={<SearchIcon color="blackAlpha.500" fontSize={["10pt", "14pt"]} />}
        />
        <Input
          value={value}
          onChange={handleSearch}
          type="text"
          fontSize="10pt"
          bg="gray.50"
          borderRadius={isFocus ? "19px 19px 0 0" : '9999px'}
          placeholder="Search Reddit"
          onFocus={() => setFocus(true)}
          onBlur={() => !isHover && setFocus(false)}
          _placeholder={{ color: 'gray.500', textOverflow: 'ellipsis' }}
          _focus={{
            boxShadow: 'none',
            outline: 'none',
            borderColor: 'purple.500'
          }}
          _hover={{
            bg: 'white',
            border: '1px solid',
            borderColor: 'purple.500'
          }}
        />
        {isFocus &&
          <Box bg="white" border="1px solid" borderColor="gray.200" borderRadius="1px 1px 4px 4px" boxShadow="rgba(0, 0, 0, 0.16) 0px 1px 4px" position="absolute" top="41.5px"
            w="inherit" maxH="480px"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            <Stack overflow="scroll" maxH="420px" py="8px" >
              {load ?
                <Flex align="center" justify="center" py="10px">
                  <Spinner size="lg" color='purple.500' />
                </Flex>
                :
                <>
                  {error ?
                    <Text color="red" px="12px" py="8px" fontSize="10pt" fontWeight="semibold">{error}</Text>
                    :
                    <Text px="12px" py="8px" fontWeight="semibold" letterSpacing="tighter" fontSize="10pt">{result.title}</Text>
                  }
                  {result.data.map(communityData => <CommunityItem key={communityData.id} {...communityData} handleClose={() => setFocus(false)} />)}
                </>
              }
            </Stack>

            <Stack direction="row" align="center" px="12px" py="15px" borderTop="2px solid" borderColor="gray.200">
              <Icon as={RxMagnifyingGlass} fontSize="21pt" />
              <Text fontWeight="medium" fontSize="10pt">Search for {value ? `"${value}"` : '...'}</Text>
            </Stack>
          </Box>
        }
      </InputGroup>
    </Flex>
  )
}
