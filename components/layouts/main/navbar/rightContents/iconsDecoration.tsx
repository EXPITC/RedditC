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
        <Button variant="iconList" >
          <BsArrowUpRightCircle />
        </Button>
        <Button variant="iconList" >
          <IoFilter />
        </Button>
        <Button variant="iconList" >
          <IoVideocamOutline />
        </Button>
      </Flex>
      <Button variant="iconList" >
        <TbMessageCircle />
      </Button>
      <Button variant="iconList" >
        <TfiBell />
      </Button>
      <Button variant="iconList" >
        <AiOutlinePlus />
      </Button>
    </Flex >
  )
}
