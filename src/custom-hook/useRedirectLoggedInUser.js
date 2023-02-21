import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { SET_LOGIN } from '../redux/features/auth/authSlice'
import { getLoginStatus } from '../service/authService'

const useRedirectLoggedInUser = (path = '/dashboard') => {
     const navigate = useNavigate()
     const dispatch = useDispatch()
     
     useEffect(() => {
          const runAsync = async () => {
               const isLoggedIn = await getLoginStatus()
               
               dispatch(SET_LOGIN(isLoggedIn))
               
               if (isLoggedIn) {
                    navigate(path)
                    toast.info('You are already Signed in.')
               }
          }
          runAsync()
     }, [dispatch])
}

export default useRedirectLoggedInUser