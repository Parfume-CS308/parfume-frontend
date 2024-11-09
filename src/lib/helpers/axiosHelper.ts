import axios from 'axios'

const setDefaultAxios = () => {
  axios.defaults.baseURL = import.meta.env.VITE_API_URL
}

const setAuthorizeInterceptor = () => {
  axios.interceptors.response.use(
    function (response) {
      return response
    },
    async function (error) {
      // if (error?.response?.data?.error === 'INVALID_TOKEN') {
      //   localStorage.clear()
      //   window.location.href = '/getStarted' + window.location.search
      //   return Promise.reject(error)
      // }

      return Promise.reject(error)
    }
  )
}

export { setDefaultAxios, setAuthorizeInterceptor }
