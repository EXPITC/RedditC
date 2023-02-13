import Header from "@/components/r/header"
import getComunnityData from "@/libs/firebase/comunnityData"
import { GetServerSideProps } from "next"

interface serverProps extends GetServerSideProps {
  params: {
    comunnityID: string
  }
}

export const getServerSideProps = async ({ params: { comunnityID } }: serverProps) => {

  const comunnityData = await getComunnityData(comunnityID)

  return {
    props: {
      comunnityData
    }
  }
}

interface comunnityData {
  comunnityData: {
    id: string,
    comunnityName: string,
    createdAt: {
      seconds: number,
      nanoseconds: number
    },
    creatorId: string,
    numberOfmember: number
  }
}

export default function ComunnityPage({ comunnityData }: comunnityData) {

  return (
    <>
      <Header comunnityID={comunnityData.id} comunnityName={comunnityData.comunnityName} />
      <h1> Welcome to {comunnityData.comunnityName}</h1>
    </>
  )
}
