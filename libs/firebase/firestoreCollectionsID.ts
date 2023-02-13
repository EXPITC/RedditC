// This exits to globalize the collections and prevent typo under the string hood
const COMMUNITIES = 'communities'
const USERS = 'users'
const COMMUNITYSUBS = 'communitySubs'

const collections = {
  COMMUNITIES: {
    id: COMMUNITIES
  },
  USERS: {
    id: USERS,
    COMMUNITYSUBS: {
      id: COMMUNITYSUBS
    }
  }
}

export default collections
