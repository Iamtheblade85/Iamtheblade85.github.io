import axios from 'axios';

const myAxios = axios.create({
  baseURL: 'https://k9xqsxsf3p.us-east-1.awsapprunner.com'
});

export default myAxios;