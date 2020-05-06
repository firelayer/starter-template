import axios from 'axios'
import { auth } from './firebase'

const API = axios.create({
  baseURL: '/api/v1'
})

API.interceptors.request.use(async (config) => {
  const user = auth().currentUser

  if (user) {
    const token = await user.getIdToken()

    config.headers['Authorization'] = `Bearer ${token}`
  }

  return config
}, (error) => {
  return Promise.reject(error)
})

export default API
