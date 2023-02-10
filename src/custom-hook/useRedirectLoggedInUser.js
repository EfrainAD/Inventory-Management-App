import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { selectIsLoggedIn } from '../redux/features/auth/authSlice'

const useRedirectLoggedInUser = (path) => {
     const navigate = useNavigate()
     const isLoggedIn = useSelector(selectIsLoggedIn)

     useEffect(() => {
          if (isLoggedIn) {
               navigate('/dashboard')
               toast.info('You are already Signed in.')
          }
     }, [isLoggedIn])
}

export default useRedirectLoggedInUser