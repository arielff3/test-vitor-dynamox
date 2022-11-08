import axios from 'axios'

export const baseURL = import.meta.env.VITE_BACK_BASE_URL

export const api = axios.create({
  baseURL,
})
