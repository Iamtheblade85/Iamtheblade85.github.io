import axios from '../../axios/axios';

function getNfts(waxAccount) {
  return axios.get(`https://wax.api.atomicassets.io/atomicassets/v1/assets/?owner=${waxAccount}&collection_name=cryptochaos1&sort=rdata`)
  // for testnet
  // https://test.wax.api.atomicassets.io/atomicassets/v1/assets/?owner=${waxAccount}&collection_name=cryptochaos1&sort=rdata
  // for mainnet
  // https://wax.api.atomicassets.io/atomicassets/v1/assets/?owner=${waxAccount}&collection_name=cryptochaos1&sort=rdata
}

function getWorkingNft(id) {
  return axios.get(`https://wax.api.atomicassets.io/atomicassets/v1/assets/${id}`)
  // for testnet
  // https://test.wax.api.atomicassets.io/atomicassets/v1/assets/${id}
  // for mainnet
  // https://wax.api.atomicassets.io/atomicassets/v1/assets/${id}
}

const NftsService = {
  getNfts, getWorkingNft
}

export default NftsService;