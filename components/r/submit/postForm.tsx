import { BsLink45Deg, BsMic } from "react-icons/bs";
import { BiPoll } from "react-icons/bi";
import { IoDocumentText, IoImageOutline } from "react-icons/io5";
import { Flex, Text, Tab, TabList, Tabs, Icon, Alert, AlertIcon, AlertTitle } from "@chakra-ui/react";
import TabPanelList from "./postform/tabPanel";
import { ChangeEvent, useEffect, useState } from "react";
import { Post } from "@/libs/atoms/postsAtom";
import { User } from "firebase/auth";
import { useRouter } from "next/router";
import { serverTimestamp, Timestamp } from "firebase/firestore";
import uploadPost from "@/libs/firebase/uploadPost";

const formTabs = [
  {
    title: 'Post',
    icon: IoDocumentText
  },
  {
    title: 'Images & Videos',
    icon: IoImageOutline
  },
  {
    title: 'Link',
    icon: BsLink45Deg
  },
  {
    title: 'Poll',
    icon: BiPoll
  },
  {
    title: 'Talk',
    icon: BsMic
  }
]

export interface TabItem {
  title: string,
  icon: React.ReactNode
}

interface PostForm {
  user: User | undefined | null,
}

const PostForm = ({ user }: PostForm) => {
  const router = useRouter()
  const [tab, setTab] = useState(0)
  useEffect(() => {
    // This useEffect handle click image from linkPost component for tab
    const { tabIndex } = router.query
    if (!tabIndex) return
    setTab(parseInt(tabIndex as string))
  }, [])
  const [inputText, setInputText] = useState({
    title: '',
    body: ''
  })
  const [imgUrl, setImgUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState<string | undefined>()

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (err) setErr('')
    setInputText(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }
  const handleUpload = async () => {

    const { communityID } = router.query
    const post: Post = {
      id: '',
      communityId: communityID as string,
      creatorId: user!.uid,
      creatorName: user!.displayName || user!.email!.split('@')[0],
      title: inputText.title,
      body: inputText.body,
      numberOfComments: 0,
      voteStatus: 0,
      createdAt: serverTimestamp() as Timestamp
    }
    setLoading(true)
    setErr(await uploadPost({ newPost: post, imgUrl }))
    setLoading(false)

    if (err) return
    // Clear the data and push back to communityID
    setInputText({
      title: '',
      body: ''
    })
    setImgUrl('')

    // Dont use back cause when user reload do same in the same page it will just back to history stack not to communityID
    router.push(`/r/${communityID}`)
  }

  return (
    <Flex direction="column" bg="white" borderRadius="4">

      <Tabs index={tab} onChange={setTab}
        overflow="hidden" borderRadius="4px">
        <TabList justifyContent="space-between" bg="gray.200">

          {formTabs.map(i =>
            <Tab key={i.title}
              bg="white" color="gray.500" fontSize={["8pt", "9pt", "11pt"]} fontWeight="semibold"
              p={["0", "4px 2px", "4px 2px", "15px 17px"]} w={['full', 'auto']} minWidth={['auto', 'auto', "101px"]}
              borderBottom="1px" borderColor="gray.200"
              _selected={{ color: 'purple.400', borderColor: 'purple.400', borderBottom: "2px", bg: "purple.50" }}>
              <Icon as={i.icon} fontSize={["13pt", "16pt"]} mr={['0', '5px']} /> {i.title}
            </Tab>
          )}

        </TabList>
        <TabPanelList
          inputText={inputText} onChange={onChange}
          imgUrl={imgUrl} setImgUrl={setImgUrl} setTab={setTab}
          upload={handleUpload} loading={loading} setErr={setErr} err={err}
        />
      </Tabs>
      {err && (
        <Alert status="error" borderRadius="0 0 4px 4px">
          <AlertIcon />
          <AlertTitle mr="2">{err}</AlertTitle>
        </Alert>
      )}

    </Flex>
  )
}


export default PostForm
