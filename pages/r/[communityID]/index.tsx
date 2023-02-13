import PageR404 from "@/components/r/404"
import Header from "@/components/r/header"
import getcommunityData from "@/libs/firebase/communityData"
import { GetServerSideProps } from "next"

interface serverProps extends GetServerSideProps {
  params: {
    communityID: string
  }
}

export const getServerSideProps = async ({ params: { communityID } }: serverProps) => {

  const communityData = await getcommunityData(communityID)

  return {
    props: {
      communityData
    }
  }
}

interface communityData {
  communityData: {
    id: string,
    communityName: string,
    createdAt: {
      seconds: number,
      nanoseconds: number
    },
    creatorId: string,
    numberOfmember: number
  }
}

export default function communityPage({ communityData }: communityData) {
  if (!communityData) return <PageR404 />

  return (
    <>
      <Header communityID={communityData.id} communityName={communityData.communityName} />
      <h1> Welcome to {communityData.communityName}</h1>
    </>
  )
}
