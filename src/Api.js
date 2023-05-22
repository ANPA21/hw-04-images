import axios from 'axios';
const API_KEY = '34858553-b4a7208f0f3e70c0555ff02c9';
axios.defaults.baseURL = 'https://pixabay.com/api/';

async function fetchImages(query, page, abortController) {
  const { signal } = abortController;
  const r = await axios.get('/', {
    params: {
      key: API_KEY,
      q: query,
      page: page,
    },
    signal,
  });
  return r.data;
}
export { fetchImages };
