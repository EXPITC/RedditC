// This exits to globalize the collections and prevent typo under the string hood
const COMMUNITIES = 'communities'
const USERS = 'users'
const COMMUNITYSUBS = 'communitySubs'
const POSTS = 'posts'
const IMAGE = 'image'
const VOTEPOST = 'votePost'

const collections = {
  POSTS: {
    id: POSTS,
    xPost: {
      image: {
        id: IMAGE
      }
    }
  },
  COMMUNITIES: {
    id: COMMUNITIES,
    storage: {
      image: {
        id: IMAGE
      }
    }
  },
  USERS: {
    id: USERS,
    COMMUNITYSUBS: {
      id: COMMUNITYSUBS
    },
    VOTEPOST: {
      id: VOTEPOST
    }
  }
}

export default collections
