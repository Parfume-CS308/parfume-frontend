import axios from 'axios'

const setDefaultAxios = () => {
  axios.defaults.headers.get['Pragma'] = 'no-cache'
  axios.defaults.baseURL = import.meta.env.VITE_API_URL
  axios.defaults.headers['Access-Control-Allow-Origin'] = 'http://localhost:8016'
  axios.defaults.withCredentials = true
}

const setAuthorizeInterceptor = () => {
  axios.interceptors.response.use(
    function (response) {
      return response
    },
    async function (error) {
      if (error?.response?.data?.error === 'INVALID_TOKEN') {
        localStorage.clear()
        window.location.href = '/' + window.location.search
        return Promise.reject(error)
      }

      return Promise.reject(error)
    }
  )
}

export { setDefaultAxios, setAuthorizeInterceptor }
