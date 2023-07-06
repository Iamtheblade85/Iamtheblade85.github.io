import axios from '../../axios/axios';

function getNfts(waxAccount) {
  return axios.get(`https://test.wax.api.atomicassets.io/atomicassets/v1/assets/?owner=${waxAccount}&collection_name=cryptochaos1&sort=rdata`)
}

function getStagingNfts(token) {
  return axios.get('/api/listStagingTableNft',
    {
      headers: {
        "Authorization": 'Bearer ' + token
      }
    })
}

function moveFromGameToStaging(token, body) {
  return axios.post('/api/moveFromGameToStaging', body,
    {
      headers: {
        "Authorization": 'Bearer ' + token
      }
    })
}

function moveFromStagingToGame(token, body) {
  return axios.post('/api/moveFromStagingToGame', body,
    {
      headers: {
        "Authorization": 'Bearer ' + token
      }
    })
}

function moveFromStagingToWallet(token, body) {
  return axios.post('/api/moveFromStagingToWallet', body,
    {
      headers: {
        "Authorization": 'Bearer ' + token
      }
    })
}

const NftsService = {
  getNfts,
  getStagingNfts,
  moveFromGameToStaging,
  moveFromStagingToGame,
  moveFromStagingToWallet
}

export default NftsService;