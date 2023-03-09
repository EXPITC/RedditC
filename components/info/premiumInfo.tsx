import { infoModalState } from "@/libs/atoms/infoPropsModalAtoms"
import { Box, Button, Flex, Icon, Stack, Text } from "@chakra-ui/react"
import { BiShieldQuarter } from "react-icons/bi"
import { useSetRecoilState } from "recoil"




const PremiumInfo = () => {
  const setInfoPropsModal = useSetRecoilState(infoModalState)

  return (
    <Stack p="8px 12px" bg="white" border="1px solid" borderColor="gray.300" borderRadius="4px" overflow="hidden">
      <Flex>
        <Flex align="center" justify="flex-start" w="15%" >
          <Icon as={BiShieldQuarter} fontSize="30px" color="purple.500" />
        </Flex>
        <Box >
          <Text fontSize="13px" fontWeight="semibold" letterSpacing="wide">Reddit Premium</Text>
          <Text fontSize="13px" fontWeight="normal" letterSpacing="tight">The best Reddit experience, with monthly Coins</Text>
        </Box>
      </Flex>
      <Button w="full" h="34px" onClick={() => setInfoPropsModal(true)}>Try Now</Button>
    </Stack>
  )
}


export default PremiumInfo
