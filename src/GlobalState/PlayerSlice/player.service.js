import axios from '../../axios/axios'

function signupPlayer(body) {
  return axios.post('/api/signup', body)
}

function loginPlayer(body) {
  return axios.post('/api/login', body)
}

function getAuthorizedPlayer(token) {
  return axios.get('/api/me', {
    headers: {
      "Authorization": 'Bearer ' + token
    }
  })
}

function getCharacterInventory(token) {
  return axios.get('/api/fetchCharacterInventory', {
    headers: {
      "Authorization": 'Bearer ' + token
    }
  })
}

const PlayerService = {
  signupPlayer,
  loginPlayer,
  getAuthorizedPlayer,
  getCharacterInventory
}

export default PlayerService;