import communityMenuState from "@/libs/atoms/communityMenuAtoms"
import { Box, Button, Divider, Flex, Stack, Text } from "@chakra-ui/react"
import Image from "next/image"
import { useState } from "react"
import { useSetRecoilState } from "recoil"
import CreateComunityModal from "../modals/createCommunityModal"




const HomeInfo = () => {
  const setCommunityMenu = useSetRecoilState(communityMenuState)
  // const setCommun = useSetRecoilState()
  const [isOpen, setOpen] = useState(false)

  const handleCreatePost = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
    setCommunityMenu(prev => ({ ...prev, isOpen: true }))
  }


  return (
    <Stack minH="265px" bg="white" position="sticky" top="12px" zIndex="1" p="12px" spacing="2"
      border="1px solid" borderColor="gray.300" borderRadius="4px" overflow="hidden"
      bgImage="url(/images/home-banner@2x.png)" backgroundSize="contain" backgroundRepeat="no-repeat" backgroundPosition="top"
    >

      <CreateComunityModal isOpen={isOpen} onClose={() => setOpen(false)} />

      <Box>
        <Flex pt="10px" >
          <Image src="/images/snoo-home@2x.png" width={40} height={68} alt="reddit mascot" />
          <Text alignSelf="flex-end" p="10px" fontWeight="semibold" letterSpacing="normal">Home</Text>
        </Flex>
      </Box>
      <Text fontSize="14px" fontWeight="normal" letterSpacing="normal">Your personal Reddit frontpage. Come here to check in with your favorite communities.</Text>

      <Flex py="2">
        <Divider />
      </Flex>

      <Button onClick={handleCreatePost}
      >Create Post</Button>
      <Button onClick={() => setOpen(true)}
        variant="outline">Create Community</Button>

    </Stack>
  )
}

export default HomeInfo
