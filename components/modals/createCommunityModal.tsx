import { auth } from '@/libs/firebase/clientApp'
import createCommunity from '@/libs/firebase/createCommunity'
import {
  Button,
  Stack,
  Radio,
  Text,
  ModalFooter,
  ModalOverlay,
  Modal,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Flex,
  Divider,
  Box,
  Input,
  RadioGroup
} from '@chakra-ui/react'
import { ChangeEvent, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { AiOutlineInfoCircle } from 'react-icons/ai'
import { FaRegEye, FaUser } from 'react-icons/fa'

interface props {
  isOpen: boolean
  onClose: () => void
}

export default function CreateComunityModal({ isOpen, onClose }: props) {
  const [user] = useAuthState(auth)
  const [communityName, setCommunityName] = useState('')
  const [type, setType] = useState('Public')
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState('')

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (e.target.value.length >= 22) return
    setCommunityName(e.target.value)
  }

  const handleCreate = async () => {
    if (err) setErr('')

    const regex = /[ `!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?~]/
    if (regex.test(communityName) || communityName.length < 3)
      return setErr(
        'Community names must be between 3–21 characters, and can only contain letters, numbers, or underscores.'
      )

    setLoading(true)
    const fail = await createCommunity(communityName, type, user)
    if (fail) setErr(fail)
    setLoading(false)
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent maxW="lg" borderRadius="md" overflow="hidden">
          <ModalHeader fontSize="md" pb="1" letterSpacing="wide">
            Create a community
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Divider mb="4" />
            <Box mb="6">
              <Text fontWeight="semibold">Name</Text>
              <Flex color="gray.500">
                <Text fontSize="8pt" mr="1">
                  Community names including capitalization cannot be changed.
                </Text>
                <AiOutlineInfoCircle />
              </Flex>
            </Box>

            <Flex position="relative" align="center" my="3">
              <Text color="gray.400" position="absolute" zIndex="999" pl="2">
                r/
              </Text>
              <Input
                onChange={onChange}
                value={communityName}
                required
                fontSize="10pt"
                _placeholder={{ color: 'gray.500', fontWeight: 'bold' }}
                _hover={{
                  border: '1px solid',
                  borderColor: 'purple.500'
                }}
                _focus={{
                  boxShadow: 'none',
                  outline: 'none',
                  borderColor: 'purple.500'
                }}
                type="text"
                paddingLeft="21px"
                name="community"
              />
            </Flex>

            <Box fontSize="9pt">
              <Text color={communityName.length == 21 ? 'red' : 'gray.500'}>
                {21 - communityName.length} Characters remaining
              </Text>
              {!communityName && (
                <Text color="red">A community name is required</Text>
              )}
              {err && <Text color="red">{err}</Text>}
            </Box>

            <Box my="4">
              <Text mb="2" fontWeight="semibold">
                Community type
              </Text>
              <RadioGroup onChange={setType} value={type}>
                <Stack direction="column">
                  <Radio
                    value="Public"
                    colorScheme="purple"
                    _focus={{ boxShadow: 'none' }}
                  >
                    <Flex
                      fontSize="10pt"
                      align="center"
                      color="gray.500"
                      pl="0.5"
                    >
                      <FaUser />
                      <Text ml="2" mr="1" fontWeight="semibold" color="black">
                        Public
                      </Text>
                      <Text fontSize="8pt" pt="0.5">
                        Anyone can view, post, and comment to this community
                      </Text>
                    </Flex>
                  </Radio>
                  <Radio
                    value="Restricted"
                    colorScheme="purple"
                    _focus={{ boxShadow: 'none' }}
                  >
                    <Flex
                      fontSize="10pt"
                      align="center"
                      color="gray.500"
                      pl="0.5"
                    >
                      <FaRegEye />
                      <Text ml="2" mr="1" fontWeight="semibold" color="black">
                        Restricted
                      </Text>
                      <Text fontSize="8pt" pt="0.5">
                        Anyone can view this community, but only approved users
                        can post
                      </Text>
                    </Flex>
                  </Radio>
                  <Radio
                    value="Private"
                    colorScheme="purple"
                    _focus={{ boxShadow: 'none' }}
                  >
                    <Flex
                      fontSize="10pt"
                      align="center"
                      color="gray.500"
                      pl="0.5"
                    >
                      <FaUser />
                      <Text ml="2" mr="1" fontWeight="semibold" color="black">
                        Private
                      </Text>
                      <Text fontSize="8pt" pt="0.5">
                        Only approved users can view and submit to this
                        community
                      </Text>
                    </Flex>
                  </Radio>
                </Stack>
              </RadioGroup>
            </Box>
          </ModalBody>

          <ModalFooter bg="gray.100">
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button variant="solid" onClick={handleCreate} isLoading={loading}>
              Create Community
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
