import { Box, Flex, Button, Input, Textarea } from "@chakra-ui/react"
import { InputPanelProps } from "../tabPanel"


const InputPanel = ({ inputText, onChange, upload, loading }: InputPanelProps) => {

  return (
    <Box position="relative">

      <Input name="title" type="text" onChange={onChange} value={inputText.title}
        placeholder="Title"
        fontSize="11pt"
        borderRadius="4px"
        _hover={{
          bg: "white",
          border: "1px solid",
          borderColor: "purple.500"
        }}
        _focus={{
          boxShadow: "none",
          outline: "none",
          borderColor: "purple.500"
        }}
      />

      <Textarea name="body" onChange={onChange} value={inputText.body}
        placeholder="Text (optional)"
        fontSize="11pt"
        borderRadius="4px"
        minHeight="122px" my="2"
        _hover={{
          bg: "white",
          border: "1px solid",
          borderColor: "purple.500"
        }}
        _focus={{
          boxShadow: "none",
          outline: "none",
          borderColor: "purple.500"
        }}
      />
      <Flex justify="flex-end" borderTop="1px solid" borderColor="gray.200" mt="2" pt="2">
        <Button isDisabled={!inputText.title} onClick={upload} isLoading={loading} h="32px" maxW="fit-content" _hover={{ opacity: 0.8, bg: 'purple.500' }} >Post</Button> </Flex>
    </Box >
  )
}

export default InputPanel
