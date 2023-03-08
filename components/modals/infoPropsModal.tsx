import { infoModalState } from "@/libs/atoms/infoPropsModalAtoms"
import { Box, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text } from "@chakra-ui/react"
import { useRecoilState } from "recoil"

const InfoPropsModal = () => {
  const [infoModal, setInfoModal] = useRecoilState(infoModalState)

  const dict = [
    { header: 'Helloo', body: 'I Love to tell you if I make all of this I would be a real redditor..., HAHAHAHA' },
    { header: 'Sirr', body: 'I came here to inform you, right know the functionality only works for some good looking people, unfortunately its not working for me either..' },
    { header: 'Oh hey sir', body: 'I was close to deploying the functionality for production, until God whispered to me `read the instructions...`' },
    { header: 'Okayy', body: 'Oh wait... its a bug.., its a bug right?,  right??...' }
  ]
  const n = Math.floor(Math.random() * 4)

  return (
    <Modal onClose={() => setInfoModal(false)} isOpen={infoModal} isCentered>
      <ModalOverlay />
      <ModalContent position="relative" color="brand.100" minH="400px" bgSize="contain" bgPosition="center" bgGradient="linear-gradient(to bottom, rgba(0,0,0,0.10), rgba(128,90,213,0.75))">
        <ModalHeader>{dict[n].header}</ModalHeader>
        <ModalCloseButton />
        <Flex flexGrow="1" p="20px"  >
          <Box bgImage="url(/images/predictor_snoo.png)" bgSize="contain" bgRepeat="no-repeat" bgPosition="center" flex="1" />
          <Box flex="1">
            <ModalBody bg="rgba(255,255,255,0.15)" borderRadius="4px" backdropFilter="blur(2px)" px="10px" letterSpacing="wide">
              {dict[n].body}
              <Text fontSize="6px">*Please.. Please dont fire me...</Text>
            </ModalBody>
          </Box>
        </Flex>
      </ModalContent>
    </Modal >
  )
}


export default InfoPropsModal
