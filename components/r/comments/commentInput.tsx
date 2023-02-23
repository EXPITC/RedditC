import { Box, Flex, Textarea, Text, Button, Divider, Alert, AlertIcon } from "@chakra-ui/react"
import { User } from "firebase/auth"
import { Dispatch, SetStateAction } from "react"

export interface commentInputProps {
  user: User | null | undefined
  err: { id: string, msg: string }
  comment: string
  setComment: Dispatch<SetStateAction<string>>
  loading: boolean
  onCreateComment: (comment: string) => void
}

const CommentInput = ({ user, comment, err, setComment, loading, onCreateComment }: commentInputProps) => {

  return (
    <Box>
      <Box position="relative">
        {user &&
          <Text fontSize="9pt" color="gray.600" mb="1px" pl="1px">Comment as {user.displayName || user.email?.split('@')[0]}</Text>
        }
        <Textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="What are you thoughts?"
          fontSize="10pt"
          borderRadius="4px"
          minH="160px"
          pb="10"
          _placeholder={{ color: "gray.500" }}
          _focus={{
            boxShadow: "unset",
            outline: "unset",
            border: "1px solid",
            borderColor: "purple.500"
          }}
        />
        <Flex
          position="absolute"
          left="1px"
          right="1px"
          bottom="1px"
          zIndex="1"
          justify="flex-end"
          bg="gray.100"
          p="6px 8px"
          borderRadius="0 0 4px 4px"
        >
          <Button
            height="26px"
            isDisabled={!comment.length}
            _disabled={{
              opacity: 0.5,
              cursor: 'not-allowed',
              _hover: {
                bg: 'purple.500'
              }
            }}
            isLoading={loading}
            onClick={() => onCreateComment(comment)}
          >
            Comment
          </Button>
        </Flex>
      </Box>

      {err.id === 'Universal' &&
        <Alert status="warning" colorScheme="red" fontSize="10pt" mt="15px" borderRadius="sm">
          <AlertIcon />
          {err.msg}
        </Alert>
      }

      <Divider my="5" borderColor="gray.300" />
    </Box >
  )
}


export default CommentInput
