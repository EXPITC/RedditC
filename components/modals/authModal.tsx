import { authModalState } from '@/libs/atoms/authModalAtoms'
import { auth } from '@/libs/firebase/clientApp'
import {
  Flex,
  Modal,
  Text,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Divider
} from '@chakra-ui/react'
import { useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useRecoilState } from 'recoil'
import AuthForm from './authModal/authForm'
import OAuthButton from './authModal/oAuthButton'
import ResetPassword from './authModal/resetPassword'

export default function AuthModal() {
  const [user, _loading, _error] = useAuthState(auth)
  const [modalState, setModalState] = useRecoilState(authModalState)

  const handleClose = () => {
    setModalState(prev => ({
      ...prev,
      open: false
    }))
  }

  useEffect(() => {
    if (user) handleClose()
  }, [user])

  return (
    <>
      <Modal isOpen={modalState.open} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent
          bg="white"
          py="4"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          {modalState.view != 'Reset Password' && (
            <ModalHeader textAlign="center">{modalState.view}</ModalHeader>
          )}
          <ModalCloseButton color="gray.400" />
          <ModalBody display="flex" alignItems="center" justifyContent="center">
            <Flex direction="column" align="center" justify="center" w="70%">
              {modalState.view === 'Reset Password' ? (
                <ResetPassword />
              ) : (
                <>
                  <OAuthButton />
                  <Flex my="5" w="full" justify="center" align="center">
                    <Divider bg="gray.300" />
                    <Text
                      fontSize="11pt"
                      mx="4"
                      color="gray.500"
                      fontWeight="bold"
                    >
                      OR
                    </Text>
                    <Divider bg="gray.300" />
                  </Flex>
                  <AuthForm />
                </>
              )}
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
