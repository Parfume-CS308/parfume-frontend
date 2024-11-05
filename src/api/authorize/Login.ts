import axios from 'axios'

const login = async (email: string, password: string) => {
  const response = await axios.post('/api/v1/authorize/login', {
    email,
    password
  })
  return response.data
}

export { login }
