import axios from 'axios'

const setDefaultAxios = () => {
  axios.defaults.baseURL = import.meta.env.VITE_API_URL
}

export { setDefaultAxios }
