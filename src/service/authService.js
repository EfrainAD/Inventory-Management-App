import axios from 'axios'
import { toast } from "react-toastify"

export const API_URL = process.env.REACT_APP_BACKEND_URL

export const validateEmail = (email) => {
     const emailValidater = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/

     return email.match(emailValidater)
}

export const registerUser = async (userData) => {
     try {
          const response = await axios.post(`${API_URL}/api/users/register`, userData)
          
          if (response.statusText === 'Created') {
               toast.success('User Registered successfully')
               return response.data
          }
     } catch (error) {
          const errorMessage = (error.response && error.response.data && error.response.msg) 
          || error.message 
          || error.toString()
          toast.error(errorMessage)
     }
}