import { TabPanel, TabPanels } from '@chakra-ui/react'
import { ChangeEvent, Dispatch, SetStateAction } from 'react'
import ImagePanel from './tabPanel/imagePanel'
import InputPanel from './tabPanel/inputPanel'

export interface InputPanelProps {
  inputText: {
    title: string
    body: string
  }
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  upload: () => void
  loading: boolean
}
export interface ImagePanelProps {
  imgUrl: string
  setImgUrl: Dispatch<SetStateAction<string>>
  setTab: Dispatch<SetStateAction<number>>
  setErr: Dispatch<SetStateAction<string | undefined>>
  err: string | undefined,
  convertToDataUrlAndSaveToImgUrl: (File: Blob) => {}
}

interface TabPanelListProps extends InputPanelProps, ImagePanelProps { }

const TabPanelList = ({
  inputText,
  onChange,
  imgUrl,
  setImgUrl,
  setTab,
  upload,
  loading,
  setErr,
  err,
  convertToDataUrlAndSaveToImgUrl
}: TabPanelListProps) => (
  <TabPanels>
    <TabPanel>
      <InputPanel
        inputText={inputText}
        onChange={onChange}
        upload={upload}
        loading={loading}
      />
    </TabPanel>
    <TabPanel>
      <ImagePanel
        convertToDataUrlAndSaveToImgUrl={convertToDataUrlAndSaveToImgUrl}
        imgUrl={imgUrl}
        setImgUrl={setImgUrl}
        setTab={setTab}
        setErr={setErr}
        err={err}
      />
    </TabPanel>
    <TabPanel>
      <p>Link!</p>
    </TabPanel>
    <TabPanel>
      <p>Pool!</p>
    </TabPanel>
    <TabPanel>
      <p>Talk!</p>
    </TabPanel>
  </TabPanels>
)

export default TabPanelList
