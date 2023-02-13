import { Box, Button, Flex, Text } from "@chakra-ui/react"
import Head from "next/head"
import Image from 'next/image'
import { useState } from "react"

interface props {
  communityID: string,
  communityName: string
}

const ButtonHeader = ({ join = false }: { join: boolean }) => {
  const [joined, setJoined] = useState('Joined')

  const handleOnClick = () => {
    if (join) return console.log('Leave')
    console.log('Join')

  }
  return (
    <Button variant={join ? 'outline' : 'solid'}
      fontWeight="700" fontSize="11pt"
      minWidth="32px" maxHeight="32px" w="96px"
      onClick={handleOnClick}
      onMouseEnter={() => join ? setJoined('Leave') : null}
      onMouseLeave={() => join ? setJoined('Joined') : null}
    >
      {join ? joined : 'Join'}
    </Button>
  )
}

const Header = ({ communityID, communityName }: props) => {

  const user = {
    join: true
  }

  return (
    <>
      <Head>
        <title>{`${communityName}`}</title>
      </Head>
      <Box height="164px" >
        <Box bg="purple.500" h="50%" w="full" />
        <Flex flexGrow="1" h="50%" bg="white" justify="center">
          <Flex width="95%" maxWidth="860px" mt="-14px" mb="12px">
            <Box>
              <Image src="/images/redditFace.svg" alt="community logo"
                style={{ border: '4px solid white', borderRadius: '100%' }}
                width={72} height={72}
              />
            </Box>
            <Flex pl="16px" mt="24px">
              <Flex direction="column" pr="24px">
                <Text fontWeight="800" fontSize="16pt">{communityName}</Text>
                <Text fontWeight="600" fontSize="10pt" color="gray.500">r/{communityID}</Text>
              </Flex>
              <ButtonHeader join={user.join} />
            </Flex>
          </Flex>
        </Flex>
      </Box>
    </>
  )
}


export default Header
