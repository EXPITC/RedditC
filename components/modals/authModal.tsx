import { authModalState } from "@/libs/atoms/authModalAtoms";
import { Flex, Modal, Text, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Divider, Box } from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import AuthForm from "./authForm";
import OAuthButton from "./oAuthButton";



export default function AuthModal() {
  const [modalState, setModalState] = useRecoilState(authModalState)

  const handleClose = () => {
    setModalState(prev => ({
      ...prev,
      open: false
    }))
  }
  return (
    <>
      <Modal isOpen={modalState.open} onClose={handleClose}>

        <ModalOverlay />
        <ModalContent bg="white" >
          <ModalHeader textAlign="center">{modalState.view}</ModalHeader>
          <ModalCloseButton color="gray.400" />
          <ModalBody
            display="flex" alignItems="center" justifyContent="center"
          >
            <Flex direction="column" align="center" justify="center" width="70%">
              <OAuthButton />
              <Flex my="5" w="full" justify="center" align="center" >
                <Divider bg="gray.300" />
                <Text fontSize="11pt" mx="4" color="gray.500" fontWeight="bold">OR</Text>
                <Divider bg="gray.300" />
              </Flex>
              <AuthForm />
              {/* <AuthInput /> */}
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
