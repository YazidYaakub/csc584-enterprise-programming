import axios from 'axios'

export const api = () =>
  axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/api/`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `JWT ${localStorage.getItem('token')}`,
      'Access-Control-Allow-Origin': '*'
    }
  })
