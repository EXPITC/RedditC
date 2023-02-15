import ContentLayouts from "@/components/layouts/content";
import PostForm from "@/components/r/submit/postForm";
import { auth } from "@/libs/firebase/clientApp";
import { Box, Divider, Text } from "@chakra-ui/react";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Submit() {
  const [user] = useAuthState(auth)

  return (
    <ContentLayouts>
      <>
        <Box >
          <Text>Create a post</Text>
          <Divider my="5" borderColor="white" />
        </Box>
        <PostForm user={user} />
      </>
      <>
      </>
    </ContentLayouts>
  )
}
