import { Flex } from '@chakra-ui/react'

interface props {
  children: React.ReactNode
}

const ContentLayouts = ({ children }: props) =>
  // If children not exist its not render
  children ? (
    <Flex p="20px 0" justify="center">
      <Flex width="95%" maxWidth="976px" justify="center">
        {/* Mid content */}
        <Flex direction="column" width={['100%', '100%', '64%']}>
          {children[0 as keyof typeof children]}
        </Flex>

        {/* Right Info */}
        <Flex
          direction="column"
          flexGrow="1"
          display={['none', 'none', 'none', 'flex']}
          ml="24px"
        >
          {children[1 as keyof typeof children]}
        </Flex>
      </Flex>
    </Flex>
  ) : (
    <h3>Whoops no children</h3>
  )

export default ContentLayouts
