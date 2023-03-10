import { Button } from '@chakra-ui/react'
import { useState } from 'react'

interface ButtonJoinLeaveProps {
  isJoin: boolean
  loading: boolean
  handleClick: () => void
}
const ButtonJoinLeave = ({
  isJoin = false,
  loading,
  handleClick
}: ButtonJoinLeaveProps) => {
  const [joined, setJoined] = useState('Joined')

  return (
    <Button
      onClick={handleClick}
      isLoading={loading}
      fontWeight="700"
      fontSize="11pt"
      minWidth="32px"
      maxHeight="32px"
      w="96px"
      variant={isJoin ? 'outline' : 'solid'}
      onMouseEnter={() => (isJoin ? setJoined('Leave') : null)}
      onMouseLeave={() => (isJoin ? setJoined('Joined') : null)}
    >
      {isJoin ? joined : 'Join'}
    </Button>
  )
}

export default ButtonJoinLeave
