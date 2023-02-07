import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getLoginStatus } from '../service/authService'
import { SET_LOGIN } from '../redux/features/auth/authSlice'
import { toast } from 'react-toastify'

const useRedirectLoggedOutUser = (path) => {
     const navigate = useNavigate()
     const dispatch = useDispatch()

     useEffect(() => {
          const redirectLoggedOutUser = async () => {
               const loggedInStatus = await getLoginStatus()
               dispatch(SET_LOGIN(loggedInStatus))
               
               if (!loggedInStatus) {
                    toast.info('You are not signed in, maybe session has expired')
                    navigate(path)
                    return
               }
          }
          redirectLoggedOutUser()
     }, [path, navigate, dispatch])
}

export default useRedirectLoggedOutUser