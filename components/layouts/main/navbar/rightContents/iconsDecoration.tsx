import { Button, Stack } from '@chakra-ui/react'
import { BsArrowUpRightCircle } from 'react-icons/bs'
import { TbMessageCircle } from 'react-icons/tb'
import { TfiBell } from 'react-icons/tfi'
import { AiOutlinePlus } from 'react-icons/ai'
import { IoFilter, IoVideocamOutline } from 'react-icons/io5'

export default function IconsDecoration() {
  return (
    <Stack direction="row" spacing={["0", "0", "0", "1", "2"]} justify={['space-between', 'none', 'none', 'none']}  >
      <Stack direction="row" spacing={["0", "0", "0", "1", "2"]}
        display={['none', 'none', 'flex']}
        align="center"
        borderRight="1px solid"
        borderColor="gray.200"
      >
        <Button variant="iconList">
          <BsArrowUpRightCircle />
        </Button>
        <Button variant="iconList">
          <IoFilter />
        </Button>
        <Button variant="iconList">
          <IoVideocamOutline />
        </Button>
      </Stack>
      <Button variant="iconList" minW={["2", "9", "10"]} display={['none', 'none', 'inherit', 'inherit']}
      >
        <TbMessageCircle />
      </Button>
      <Button variant="iconList" minW={["2", "9", "10"]}>
        <TfiBell />
      </Button>
      <Button variant="iconList" minW={["2", "9", "10"]}>
        <AiOutlinePlus />
      </Button>
    </Stack>
  )
}
