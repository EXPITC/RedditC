import { SkeletonCircle, Flex, Stack, Skeleton } from "@chakra-ui/react";


const CommentSkeleton = () => (
  <Flex align="start" pl="2">
    <SkeletonCircle width="30px" height="30px" mr="8px" />
    <Stack spacing="1" >
      <Skeleton w="120px" h="10px" />

      <Skeleton w="200px" h="20px" />

      <Skeleton w="80px" h="15px" />

    </Stack>
  </Flex >
)

const CommentsSkeleton = () => (
  <>
    {[0, 1, 2, 3, 5].map((i) => <CommentSkeleton key={i} />)}
  </>
)

export default CommentsSkeleton
