// This exits to globalize the collections and prevent typo under the string hood
const COMUNNITIES = 'comunnities'
const USERS = 'users'
const COMUNNITYSUBS = 'comunnitySubs'

const collections = {
  COMUNNITIES: {
    id: COMUNNITIES
  },
  USERS: {
    id: USERS,
    COMUNNITYSUBS: {
      id: COMUNNITYSUBS
    }
  }
}

export default collections
