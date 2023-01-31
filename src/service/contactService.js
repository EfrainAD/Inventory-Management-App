import axios from "axios"
import { toast } from "react-toastify"

const API_URL = process.env.REACT_APP_BACKEND_URL
const API_Contact_URL = `${API_URL}/api/contactus/`

export const sendContactEmail = async (userData) => {
     try {
          const response = await axios.post(API_Contact_URL, userData)
          console.log('response:', response)
          if (response.data.sussess) {
               toast.success(response.data.msg)
               return response.data
          }
     } catch (error) {
          const errorMessage = (error.response && error.response.data && error.response.data.msg) 
          || error.message 
          || error.toString()
          toast.error(errorMessage)
     }
}