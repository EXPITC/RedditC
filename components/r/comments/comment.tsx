import {
  Alert,
  AlertIcon,
  Button,
  Flex,
  Icon,
  Stack,
  Text
} from '@chakra-ui/react'
import { Timestamp } from 'firebase/firestore'
import moment from 'moment'
import Image from 'next/image'
import {
  IoArrowDownCircleOutline,
  IoArrowDownCircleSharp,
  IoArrowUpCircleOutline,
  IoArrowUpCircleSharp
} from 'react-icons/io5'

export interface comment {
  id: string
  creatorId: string
  creatorUserName: string
  creatorPhotoUrl: string | null
  communityId: string
  postId: string
  postTitle: string
  text: string
  createdAt: Timestamp
}
export interface commentProps {
  onDeleteComment: (id: string) => Promise<void>
  userId: string
  err: { id: string; msg: string }
  loadingDelete: string
  // loadingEdit: string,
  openModalInfoProps: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void
}
interface props extends commentProps, comment {}

const Comment = ({
  onDeleteComment,
  err,
  openModalInfoProps,
  //loadingEdit,
  id,
  userId,
  creatorId,
  creatorPhotoUrl,
  creatorUserName,
  text,
  createdAt,
  loadingDelete
}: props) => (
  <Flex align="start" pl="2">
    <Image
      src={creatorPhotoUrl ? creatorPhotoUrl : '/images/redditFace.svg'}
      width={29}
      height={30}
      alt="creator photo"
      style={{ borderRadius: '50%', marginRight: '8px' }}
    />
    <Stack spacing="1">
      <Stack direction="row" align="center" fontSize="8pt">
        <Text fontWeight="semibold">{creatorUserName}</Text>
        <Text color="gray.600" fontWeight="normal">
          {moment(new Date(createdAt.seconds * 1000)).fromNow()}
        </Text>
      </Stack>

      <Text fontWeight="normal" fontSize="11pt">
        {text}
      </Text>
      {err.id === id && (
        <Alert
          status="warning"
          px="10px"
          colorScheme="red"
          mt="15px"
          borderRadius="sm"
          fontSize="8pt"
          maxH="20px"
        >
          <AlertIcon maxW="15px" />
          {err.msg}
        </Alert>
      )}
      <Stack direction="row" align="center" fontSize="9pt">
        <Button
          // onClick={(e) => { }}
          variant="iconList"
          _hover={{ bg: 'gray.200' }}
          minW="20pt"
          maxH="20pt"
        >
          <Icon
            _hover={{ color: 'brand.100' }}
            as={false ? IoArrowUpCircleSharp : IoArrowUpCircleOutline}
            color={false ? 'brand.100' : 'gray.400'}
          />
        </Button>
        <Text fontSize="10pt" fontWeight="bold">
          1
        </Text>
        <Button
          // onClick={(e) => { }}
          variant="iconList"
          _hover={{ bg: 'gray.200' }}
          minW="20pt"
          maxH="20pt"
        >
          <Icon
            _hover={{ color: 'brand.200' }}
            as={false ? IoArrowDownCircleSharp : IoArrowDownCircleOutline}
            color={false ? 'brand.200' : 'gray.400'}
          />
        </Button>

        {userId === creatorId && (
          <>
            <Button
              onClick={openModalInfoProps}
              // isLoading={loadingEdit === id ? true : false}
              variant="iconList"
              fontSize="9pt"
              maxH="20pt"
              minW="fit-content"
              px="6pt"
              fontWeight="bold"
            >
              Edit
            </Button>
            <Button
              onClick={() => onDeleteComment(id)}
              isLoading={loadingDelete === id ? true : false}
              variant="iconList"
              fontSize="9pt"
              maxH="20pt"
              px="6pt"
              fontWeight="bold"
            >
              Delete
            </Button>
          </>
        )}
      </Stack>
    </Stack>
  </Flex>
)

export default Comment
