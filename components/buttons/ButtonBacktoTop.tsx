import { Button, Flex } from '@chakra-ui/react'

export const ButtonBackToTop = () => (
  <Flex align="end" justify="center" position="relative" h="full" zIndex="0">
    <Button
      position="sticky"
      bottom="10px"
      letterSpacing="wider"
      h="34px"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      Back to Top
    </Button>
  </Flex>
)
