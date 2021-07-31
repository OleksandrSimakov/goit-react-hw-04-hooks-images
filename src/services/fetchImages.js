import axios from 'axios'

axios.defaults.baseURL = 'https://pixabay.com/api/'

export const fetchImages = async (searchQuery, page) => {
  const params =
    '&key=21751722-1c715179d2c000e30188b4b67&image_type=photo&orientation=horizontal&per_page=12'
  const response = await axios.get(`?q=${searchQuery}&page=${page}&${params}`)
  return response.data.hits
}
