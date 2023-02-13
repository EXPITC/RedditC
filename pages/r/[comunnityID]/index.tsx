

export const getServerSideProps = ({ params: { comunnityID } }: { params: { comunnityID: string } }) => {

  return {
    props: {
      comunnityID
    }
  }
}


export default function CommunityPage({ comunnityID }: { comunnityID: string }) {

  return (
    <h1>Welcome to {comunnityID}</h1>
  )
}
