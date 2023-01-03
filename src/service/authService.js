import axios from 'axios'
import toast from 'react-toastify'
export const API_URL = process.env.REACT_BACKEND_URL

export const refisterUser = async (userData) => {
     try {
          const response = await axios.post(`${API_URL}/users/register`, userData)
          if (response.statusText === 'ok') {
               toast.success('User Registered successfully')
               return response.data
          }
     } catch (error) {
          const errMsg = 
               (error.response && error.response.data && error.response.msg) 
               || error.msg 
               || error.toString()
          toast.error(errMsg)
     }
}