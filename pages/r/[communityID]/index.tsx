import ContentLayouts from '@/components/layouts/content'
import PageR404 from '@/components/r/404'
import Header from '@/components/r/header'
import LinkPost from '@/components/r/linkpost'
import PostTimeline from '@/components/r/postTimeline'
import getcommunityData from '@/libs/firebase/communityData'
import { GetServerSideProps } from 'next'

interface serverProps extends GetServerSideProps {
  params: {
    communityID: string
  }
}

export const getServerSideProps = async ({
  params: { communityID }
}: serverProps) => {
  const communityData = await getcommunityData(communityID)

  return {
    props: {
      communityData
    }
  }
}

interface communityData {
  communityData: {
    id: string
    communityName: string
    createdAt: {
      seconds: number
      nanoseconds: number
    }
    creatorId: string
    numberOfmember: number
  }
}

export default function communityPage({ communityData }: communityData) {
  if (!communityData) return <PageR404 />

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
          <h3>Info</h3>
        </>
      </ContentLayouts>
    </>
  )
}
