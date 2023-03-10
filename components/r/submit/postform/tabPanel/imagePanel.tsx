import { Button, Flex, Input, Image, Text } from '@chakra-ui/react'
import { useRef, DragEvent, ChangeEvent } from 'react'
import { ImagePanelProps } from '../tabPanel'

const ImagePanel = ({
  imgUrl,
  setImgUrl,
  setTab,
  setErr,
  err,
  convertToDataUrlAndSaveToImgUrl
}: ImagePanelProps) => {
  const ref = useRef<HTMLInputElement>(null)

  const isVideoFormat = (type: string) => {
    const videoFormat = type.search(/video/i) === 0

    if (videoFormat)
      setErr('Sorry type video under maintenance at these moments')

    return videoFormat
  }

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const typeNotImageOrVideo =
        e.dataTransfer.files[0].type.search(/image/i) === -1 &&
        e.dataTransfer.files[0].type.search(/video/i) === -1

      if (err) setErr('')
      if (typeNotImageOrVideo) return setErr('File Is Not Type Video or Image')
      if (isVideoFormat(e.dataTransfer.files[0].type)) return
      convertToDataUrlAndSaveToImgUrl(e.dataTransfer.files[0])
    }
  }
  const handleDrag = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (err) setErr('')
    if (!(e.target.files && e.target.files[0])) return
    if (isVideoFormat(e.target.files[0].type)) return
    convertToDataUrlAndSaveToImgUrl(e.target.files[0])
  }

  return (
    <>
      <Flex
        onDrop={handleDrop}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        border="1px dashed"
        borderColor="gray.300"
        borderRadius="4px"
        minH="280px"
        p="4"
        direction="column"
        align="center"
        justify="center"
      >
        {imgUrl ? (
          <>
            <Image
              src={imgUrl}
              maxH="480px"
              borderRadius="5px"
              alt="imagePost"
            />
          </>
        ) : (
          <Flex align="center" justify="center">
            <Input
              ref={ref}
              onChange={handleInput}
              type="file"
              accept="image/* , video/*"
              multiple={false}
              name="image"
              hidden
            />
            <Text mr="2">Drag and drop images or </Text>
            <Button
              onClick={() => ref.current?.click()}
              h="34px"
              variant="outline"
            >
              Upload
            </Button>
          </Flex>
        )}
      </Flex>
      {imgUrl && (
        <Flex
          justify="center"
          borderTop="1px solid"
          borderColor="gray.300"
          mt="4"
          pt="4"
        >
          <Button onClick={() => setTab(0)} mr="2" h="34px">
            back to post
          </Button>
          <Button onClick={() => setImgUrl('')} variant="outline" h="34px">
            remove
          </Button>
        </Flex>
      )}
    </>
  )
}

export default ImagePanel
