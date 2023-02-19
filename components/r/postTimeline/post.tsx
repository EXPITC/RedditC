import { ImageSkeleton } from '@/components/skeleton/postSkeleton'
import { Post as PostType } from '@/libs/atoms/postsAtom'
import { usePost } from '@/libs/hooks/usePosts'
import {
  Flex,
  Icon,
  Text,
  Button,
  Stack,
  Alert,
  AlertIcon
} from '@chakra-ui/react'
import moment from 'moment'
import Image from 'next/image'
import { useState } from 'react'
import { AiOutlineDelete } from 'react-icons/ai'
import { BsChat } from 'react-icons/bs'
import {
  IoArrowDownCircleOutline,
  IoArrowDownCircleSharp,
  IoArrowRedoOutline,
  IoArrowUpCircleOutline,
  IoArrowUpCircleSharp,
  IoBookmarkOutline
} from 'react-icons/io5'

interface PostProps extends PostType, usePost {
  listId: string
  isUserCreator: boolean
  userVoteValue: number
}

const Votebar = ({ userVoteValue, vote, onVote, id }: Partial<PostProps>) => (
  <Flex
    direction="column"
    bg="gray.100"
    align="center"
    width="40px"
    p="2"
    borderRadius="4"
  >
    <Button
      onClick={() => onVote!(id!, 1)}
      variant="iconList"
      _hover={{ bg: 'gray.200' }}
      minW="0"
      maxH="20pt"
    >
      <Icon
        fontSize="20pt"
        _hover={{ color: 'brand.100' }}
        as={userVoteValue === 1 ? IoArrowUpCircleSharp : IoArrowUpCircleOutline}
        color={userVoteValue === 1 ? 'brand.100' : 'gray.400'}
      />
    </Button>
    {vote}
    <Button
      onClick={() => onVote!(id!, -1)}
      variant="iconList"
      _hover={{ bg: 'gray.200' }}
      minW="0"
      maxH="20pt"
    >
      <Icon
        fontSize="20pt"
        _hover={{ color: 'brand.200' }}
        as={
          userVoteValue === -1
            ? IoArrowDownCircleSharp
            : IoArrowDownCircleOutline
        }
        color={userVoteValue === -1 ? 'brand.200' : 'gray.400'}
      />
    </Button>
  </Flex>
)

const PostOptions = (Post: PostProps) => (
  <Flex mb="0.5" color="gray.500" >
    <Button
      variant="iconList"
      alignItems="center"
      fontSize={["10px", "12px"]}
      p={['0px 2px', '4px 5px', "8px 10px"]}
      borderRadius="4px"
      _hover={{ bg: 'gray.200' }}
    >
      <Icon as={BsChat} mr={['1', '2']} fontSize={["16px", "20px"]} />
      {Post.numberOfComments} Comments
    </Button>
    <Button
      variant="iconList"
      alignItems="center"
      fontSize={["10px", "12px"]}
      p={['0px 2px', '4px 5px', "8px 10px"]}
      borderRadius="4px"
      _hover={{ bg: 'gray.200' }}
    >
      <Icon as={IoArrowRedoOutline} mr={['1', '2']} fontSize={["16px", "20px"]} />
      Share
    </Button>
    <Button
      variant="iconList"
      alignItems="center"
      fontSize={["10px", "12px"]}
      p={['0px 2px', '4px 5px', "8px 10px"]}
      borderRadius="4px"
      _hover={{ bg: 'gray.200' }}
    >
      <Icon as={IoBookmarkOutline} mr={['1', '2']} fontSize={["16px", "20px"]} />
      Save
    </Button>
    {Post.isUserCreator && (
      <Button
        onClick={() => Post.onDelete(Post.id, Post?.imgUrl)}
        isLoading={Post.loading === Post.id && true}
        variant="iconList"
        alignItems="center"
        fontSize={["10px", "12px"]}
        p={['0px 2px', '4px 5px', "8px 10px"]}
        borderRadius="4px"
        _hover={{ bg: 'gray.200' }}
      >
        <Icon as={AiOutlineDelete} mr={['1', '2']} fontSize={["16px", "20px"]} />
        Delete
      </Button>
    )}
  </Flex>
)

const Post = (Post: PostProps) => {
  const [imgLoading, setImgLoading] = useState(true)

  return (
    <Flex
      onClick={() => { }}
      bg="white"
      border="1px solid"
      borderColor="gray.300"
      borderRadius="4"
      _hover={{ borderColor: 'gray.500' }}
      cursor="pointer"
    >
      <Votebar {...Post} />
      <Flex direction="column" flexGrow="1">
        <Stack spacing="1" p="10px">
          {/* Header post */}
          <Stack direction="row" align="center" spacing="0.6" fontSize="9pt">
            {/* Community check */}
            <Text>
              Posted by u/{Post.creatorName}{' '}
              {moment(new Date(Post.createdAt.seconds * 1000)).fromNow()}
            </Text>
          </Stack>

          <Text fontSize="12pt" fontWeight="bold">
            {Post.title}
          </Text>
          {Post.body && (
            <Text fontSize="14px" fontWeight="normal">
              {Post.body}
            </Text>
          )}

          {/* Image Post */}
          {Post.imgUrl && (
            <Flex
              align="center"
              justify="center"
              p="2"
              maxH="460px"
              h="460px"
              position="relative"
            >
              <Image
                src={Post.imgUrl}
                alt={`Post Image by ${Post.creatorName}`}
                loading="lazy"
                fill
                style={{
                  objectFit: 'contain',
                  display: imgLoading ? 'unset' : 'initial'
                }}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                onLoadingComplete={() => setImgLoading(false)}
                onError={() => { }}
              />
              {imgLoading && <ImageSkeleton />}
            </Flex>
          )}

          <PostOptions {...Post} />
        </Stack>
        {Post.err.id === Post.id && (
          <Alert status="error">
            <AlertIcon />
            <Text mr="2">{Post.err.msg}</Text>
          </Alert>
        )}
      </Flex>
    </Flex>
  )
}

export default Post
