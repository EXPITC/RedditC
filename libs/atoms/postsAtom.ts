import { Timestamp } from "firebase/firestore";
import { atom } from "recoil";


export interface Post {
  id: string,
  communityId: string,
  creatorId: string,
  creatorName: string,
  title: string,
  body: string,
  numberOfComments: number,
  vote: number,
  imgUrl?: string,
  communityImgUrl?: string,
  createdAt: Timestamp
}
export interface votePost {
  postId: string,
  communityId: string,
  vote: number
}
export interface PostState {
  selectedPost: Post | null,
  totalCollections: number,
  userVotePost: votePost[]
  posts: Post[]
}

const defaultPostState: PostState = {
  selectedPost: null,
  totalCollections: 0,
  userVotePost: [],
  posts: []
}

export const postState = atom<PostState>({
  key: 'postState',
  default: defaultPostState
})
