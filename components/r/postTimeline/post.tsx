import { ImageSkeleton } from '@/components/skeleton/postSkeleton'
import { Post as PostType } from '@/libs/atoms/postsAtom'
import formatNumber from '@/libs/formatNumber'
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
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { AiOutlineDelete } from 'react-icons/ai'
import { BsChat, BsDot } from 'react-icons/bs'
import { FaReddit } from 'react-icons/fa'
import {
  IoArrowDownCircleOutline,
  IoArrowDownCircleSharp,
  IoArrowRedoOutline,
  IoArrowUpCircleOutline,
  IoArrowUpCircleSharp,
  IoBookmarkOutline
} from 'react-icons/io5'

interface PostProps extends PostType, usePost {
  isUserCreator: boolean
  userVoteValue: number
  homeFeed?: boolean
  openModalInfoProps: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void
  alreadyInComment: boolean
  link: string
}
interface postOptions extends PostProps {
  shareValue: { first: boolean; text: 'Share' | 'Copied' }
  setShareValue: React.Dispatch<
    React.SetStateAction<{ first: boolean; text: 'Share' | 'Copied' }>
  >
}

const Votebar = ({
  userVoteValue,
  vote,
  onVote,
  id,
  postStateValue,
  communityId
}: Partial<PostProps>) => (
  <Flex
    direction="column"
    bg={postStateValue?.selectedPost ? 'white' : 'gray.100'}
    align="center"
    width={['30px', '40px']}
    p="2"
    borderRadius="4"
  >
    <Button
      aria-label="Up vote button"
      onClick={e => onVote!(id!, communityId!, 1, e)}
      variant="iconList"
      _hover={{ bg: 'gray.200' }}
      minW="0"
      maxH="20pt"
    >
      <Icon
        aria-label="Up vote icon"
        fontSize="20pt"
        _hover={{ color: 'brand.100' }}
        as={userVoteValue === 1 ? IoArrowUpCircleSharp : IoArrowUpCircleOutline}
        color={userVoteValue === 1 ? 'brand.100' : 'gray.400'}
      />
    </Button>
    {formatNumber(vote!)}
    <Button
      aria-label="Down vote button"
      onClick={e => onVote!(id!, communityId!, -1, e)}
      variant="iconList"
      _hover={{ bg: 'gray.200' }}
      minW="0"
      maxH="20pt"
    >
      <Icon
        aria-label="Down vote icon"
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

const PostOptions = (Post: postOptions) => (
  <Flex mb="0.5" color="gray.500">
    <Button
      variant="iconList"
      aria-label="Comments button"
      alignItems="center"
      fontSize={['10px', '12px']}
      p={['0px 2px', '4px 5px', '8px 10px']}
      borderRadius="4px"
      _hover={{ bg: 'gray.200' }}
      onClick={e =>
        Post.alreadyInComment
          ? (e.stopPropagation(),
            window.scrollTo({ top: 850, behavior: 'smooth' }))
          : null
      }
    >
      <Icon as={BsChat} mr={['1', '2']} fontSize={['16px', '20px']} />
      {formatNumber(Post.numberOfComments)} Comments
    </Button>
    <Button
      variant="iconList"
      alignItems="center"
      aria-label="Share button"
      fontSize={['10px', '12px']}
      p={['0px 2px', '4px 5px', '8px 10px']}
      borderRadius="4px"
      _hover={{ bg: 'gray.200' }}
      onClick={e => {
        e.stopPropagation()
        navigator.clipboard.writeText(Post.link)
        Post.setShareValue(prev => ({ ...prev, text: 'Copied' }))
      }}
    >
      <Icon
        as={IoArrowRedoOutline}
        mr={['1', '2']}
        fontSize={['16px', '20px']}
      />
      {Post.shareValue.text}
    </Button>
    <Button
      variant="iconList"
      aria-label="Bookmark button"
      alignItems="center"
      fontSize={['10px', '12px']}
      p={['0px 2px', '4px 5px', '8px 10px']}
      borderRadius="4px"
      _hover={{ bg: 'gray.200' }}
      onClick={Post.openModalInfoProps}
    >
      <Icon
        as={IoBookmarkOutline}
        mr={['1', '2']}
        fontSize={['16px', '20px']}
      />
      Save
    </Button>
    {Post.isUserCreator && (
      <Button
        aria-label="Delete button"
        onClick={e => Post.onDelete(Post.id, Post?.imgUrl, e)}
        isLoading={Post.loading === Post.id && true}
        variant="iconList"
        alignItems="center"
        fontSize={['10px', '12px']}
        p={['0px 2px', '4px 5px', '8px 10px']}
        borderRadius="4px"
        _hover={{ bg: 'gray.200' }}
      >
        <Icon
          as={AiOutlineDelete}
          mr={['1', '2']}
          fontSize={['16px', '20px']}
        />
        Delete
      </Button>
    )}
  </Flex>
)

const Post = (Post: PostProps) => {
  const [imgLoading, setImgLoading] = useState(true)
  const selectedPost = Post.postStateValue.selectedPost
  const [shareValue, setShareValue] = useState<{
    first: boolean
    text: 'Share' | 'Copied'
  }>({ first: true, text: 'Share' })

  useEffect(() => {
    if (shareValue.first)
      return setShareValue(prev => ({ ...prev, first: false }))
    let timeout: NodeJS.Timeout

    if (shareValue.text === 'Share') return

    timeout = setTimeout(() => {
      setShareValue(prev => ({ ...prev, text: 'Share' }))
    }, 1000)

    return () => {
      clearTimeout(timeout)
    }
  }, [shareValue])

  return (
    <Flex
      onClick={() => Post.onSelect(Post.id, Post.communityId)}
      bg="white"
      border={selectedPost ? 'unset' : '1px solid'}
      borderColor="gray.300"
      borderRadius={selectedPost ? '4px 4px 0 0' : '4'}
      _hover={{ borderColor: 'gray.500' }}
      cursor={selectedPost ? 'unset' : 'pointer'}
    >
      <Votebar {...Post} />
      <Flex direction="column" flexGrow="1">
        <Stack spacing="1" p="10px">
          {/* Header post */}
          <Stack direction="row" align="center" spacing="0.6" fontSize="9pt">
            {/* Community check */}
            {Post.homeFeed && (
              <>
                {Post.communityImgUrl ? (
                  <Image
                    src={Post.communityImgUrl}
                    width={24}
                    height={24}
                    alt="community profile"
                    style={{ borderRadius: '50%', marginRight: '4px' }}
                  />
                ) : (
                  <Icon
                    as={FaReddit}
                    fontSize="24px"
                    mr="4px"
                    color="purple.500"
                  />
                )}
                <Text
                  _hover={{ textDecor: 'underline' }}
                  fontSize={['8px', '10px', '12px']}
                  fontWeight="bold"
                  onClick={e => e.stopPropagation()}
                  as={Link}
                  href={'r/' + Post.communityId}
                >
                  r/{Post.communityId}
                </Text>
                <Icon as={BsDot} color="gray.500" fontSize="7pt" />
              </>
            )}
            <Text color="gray.500" fontSize={['8px', '10px', '12px']}>
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
                fill
                style={{
                  objectFit: 'contain',
                  opacity: imgLoading ? '0%' : '100%'
                }}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                onLoadingComplete={() => setImgLoading(false)}
                onError={() => { }}
              />
              {imgLoading && <ImageSkeleton />}
            </Flex>
          )}

          <PostOptions
            {...Post}
            shareValue={shareValue}
            setShareValue={setShareValue}
          />
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
