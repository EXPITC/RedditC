import Info from '@/components/info'
import ContentLayouts from '@/components/layouts/content'
import PageR404 from '@/components/r/404'
import Header from '@/components/r/header'
import LinkPost from '@/components/r/linkpost'
import PostTimeline from '@/components/r/postTimeline'
import { communityData, communitySubsState } from '@/libs/atoms/communitiesAtoms'
import getcommunityData from '@/libs/firebase/communityData'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useSetRecoilState } from 'recoil'

interface serverProps extends GetServerSideProps {
  params: {
    communityID: string
  }
}

export const getServerSideProps = async ({
  params: { communityID }
}: serverProps): Promise<Partial<{ props: { communityData: communityData | false } }>> => {
  const communityData = await getcommunityData(communityID)

  return {
    props: {
      communityData
    }
  }
}


export default function communityPage({ communityData }: { communityData: communityData }) {
  if (!communityData) return <PageR404 />
  const setCommunitySubs = useSetRecoilState(communitySubsState)
  const router = useRouter()

  useEffect(() => {
    const currentCommunity = {
      id: '',
      communityName: '',
      imageUrl: '',
      createdAt: {
        seconds: 0,
        nanoseconds: 0
      },
      creatorId: '',
      numberOfmember: 0,
      intractedUserId: [],
      privacyType: ''
    }
    return () => {
      let { communityID } = router.query
      communityID = typeof communityID === 'string' ? communityID : '' // for safety   
      if (communityID) return

      setCommunitySubs(prev => ({
        ...prev,
        currentCommunity
      }))
    }
  }, [])
  return (
    <>
      <Header
        communityId={communityData.id}
        communityName={communityData.communityName}
      />
      <ContentLayouts>
        <>
          <LinkPost />
          <PostTimeline communityId={communityData.id} />
        </>
        <>
          <Info />
        </>
      </ContentLayouts>
    </>
  )
}
