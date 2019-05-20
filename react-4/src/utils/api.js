import axios from 'axios';

const BASE_URL = 'https://gateway.marvel.com/';

class Api {
  static get(uri) {
    return axios.get(`${BASE_URL}${uri}`);
  }
}

export default Api;
