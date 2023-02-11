import { Button, Flex } from "@chakra-ui/react";
import { BsArrowUpRightCircle } from 'react-icons/bs'
import { TbMessageCircle } from 'react-icons/tb'
import { TfiBell } from 'react-icons/tfi'
import { AiOutlinePlus } from 'react-icons/ai'
import { IoFilter, IoVideocamOutline } from 'react-icons/io5'


export default function IconsDecoration() {

  return (
    <Flex>
      <Flex display={['none', 'none', 'flex']} align="center"
        borderRight="1px solid" borderColor="gray.200"
      >
        <Button variant="icon" >
          <BsArrowUpRightCircle />
        </Button>
        <Button variant="icon" >
          <IoFilter />
        </Button>
        <Button variant="icon" >
          <IoVideocamOutline />
        </Button>
      </Flex>
      <Button variant="icon" >
        <TbMessageCircle />
      </Button>
      <Button variant="icon" >
        <TfiBell />
      </Button>
      <Button variant="icon" >
        <AiOutlinePlus />
      </Button>
    </Flex >
  )
}
