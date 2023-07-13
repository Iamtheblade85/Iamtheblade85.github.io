import axios from '../../axios/axios';

function getNfts(waxAccount) {
  return axios.get(`https://test.wax.api.atomicassets.io/atomicassets/v1/assets/?owner=${waxAccount}&collection_name=cryptochaos1&sort=rdata`)
}

const NftsService = {
  getNfts,
}

export default NftsService;