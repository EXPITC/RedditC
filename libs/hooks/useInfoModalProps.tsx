import { useSetRecoilState } from 'recoil'
import { infoModalState } from '../atoms/infoPropsModalAtoms'

const useInfoModalProps = () => {
  const setInfoModal = useSetRecoilState(infoModalState)

  const openModalInfoProps = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation()
    setInfoModal(true)
  }

  return openModalInfoProps
}

export default useInfoModalProps
