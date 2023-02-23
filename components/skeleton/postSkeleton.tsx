import { Icon, Button, Flex, Skeleton, Stack } from '@chakra-ui/react'
import { BsChat } from 'react-icons/bs'
import {
  IoArrowDownCircleOutline,
  IoArrowRedoOutline,
  IoArrowUpCircleOutline,
  IoBookmarkOutline
} from 'react-icons/io5'

export const ImageSkeleton = () => <Skeleton height="460px" width="full" />

const Skeleton_ = () => (
  <Flex
    bg="white"
    border="1px solid"
    borderColor="gray.300"
    borderRadius="4"
    cursor="progress"
  >
    <Flex
      direction="column"
      bg="gray.100"
      align="center"
      width={['30px', "40px"]}
      p="2"
      borderRadius="4"
    >
      <Button
        variant="iconList"
        _hover={{ bg: 'gray.200' }}
        minW="0"
        maxH="20pt"
      >
        <Icon
          fontSize="20pt"
          _hover={{ color: 'brand.100' }}
          as={IoArrowUpCircleOutline}
          color={'gray.400'}
        />
      </Button>
      {0}
      <Button
        variant="iconList"
        _hover={{ bg: 'gray.200' }}
        minW="0"
        maxH="20pt"
      >
        <Icon
          fontSize="20pt"
          _hover={{ color: 'brand.200' }}
          as={IoArrowDownCircleOutline}
          color={'gray.400'}
        />
      </Button>
    </Flex>

    <Flex direction="column" flexGrow="1">
      <Stack spacing="1" p="10px">
        <Skeleton height="9pt" maxW="220px" />
        <Skeleton height="14pt" maxW="340px" />
        <ImageSkeleton />

        <Flex ml="1" mb="0.5" color="gray.500">
          <Button
            variant="iconList"
            alignItems="center"
            fontSize="12px"
            p="8px 10px"
            borderRadius="4px"
            _hover={{ bg: 'gray.200' }}
          >
            <Icon as={BsChat} mr="2" fontSize="20px" />0 Comments
          </Button>
          <Button
            variant="iconList"
            alignItems="center"
            fontSize="12px"
            p="8px 10px"
            borderRadius="4px"
            _hover={{ bg: 'gray.200' }}
          >
            <Icon as={IoArrowRedoOutline} mr="2" fontSize="20px" />
            Share
          </Button>
          <Button
            variant="iconList"
            alignItems="center"
            fontSize="12px"
            p="8px 10px"
            borderRadius="4px"
            _hover={{ bg: 'gray.200' }}
          >
            <Icon as={IoBookmarkOutline} mr="2" fontSize="20px" />
            Save
          </Button>
        </Flex>
      </Stack>
    </Flex>
  </Flex>
)

const PostSkeleton = () => (
  <>
    <Skeleton_ key={'skeleton key 0'} />
    <Skeleton_ key={'skeleton key 1'} />
    <Skeleton_ key={'skeleton key 2'} />
    <Skeleton_ key={'skeleton key 3'} />
  </>
)

export default PostSkeleton
