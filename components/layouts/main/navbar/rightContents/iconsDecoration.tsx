import { Button, Stack } from '@chakra-ui/react'
import { BsArrowUpRightCircle } from 'react-icons/bs'
import { TbMessageCircle } from 'react-icons/tb'
import { TfiBell } from 'react-icons/tfi'
import { AiOutlinePlus } from 'react-icons/ai'
import { IoFilter, IoVideocamOutline } from 'react-icons/io5'
import useInfoModalProps from '@/libs/hooks/useInfoModalProps'
import { useSetRecoilState } from 'recoil'
import communityMenuState from '@/libs/atoms/communityMenuAtoms'

export default function IconsDecoration() {
  const openModalInfoProps = useInfoModalProps()
  const setMenuState = useSetRecoilState(communityMenuState)

  return (
    <Stack
      direction="row"
      spacing={['0', '0', '0', '1', '2']}
      justify={['space-between', 'none', 'none', 'none']}
    >
      <Stack
        direction="row"
        spacing={['0', '0', '0', '1', '2']}
        display={['none', 'none', 'flex']}
        align="center"
        pr="2"
        borderRight="1px solid"
        borderColor="gray.200"
      >
        <Button variant="iconList" onClick={openModalInfoProps}>
          <BsArrowUpRightCircle />
        </Button>
        <Button variant="iconList" onClick={openModalInfoProps}>
          <IoFilter />
        </Button>
        <Button variant="iconList" onClick={openModalInfoProps}>
          <IoVideocamOutline />
        </Button>
      </Stack>
      <Button
        variant="iconList"
        onClick={openModalInfoProps}
        minW={['2', '9', '10']}
        display={['none', 'none', 'inherit', 'inherit']}
      >
        <TbMessageCircle />
      </Button>
      <Button
        variant="iconList"
        onClick={openModalInfoProps}
        minW={['2', '9', '10']}
      >
        <TfiBell />
      </Button>
      <Button
        variant="iconList"
        onClick={() => setMenuState(prev => ({ ...prev, isOpen: true }))}
        minW={['2', '9', '10']}
      >
        <AiOutlinePlus />
      </Button>
    </Stack>
  )
}
