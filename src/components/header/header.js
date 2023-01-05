import React from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { SET_LOGIN } from "../../redux/features/auth/authSlice"
import { signOutUser } from "../../service/authService"

const Header = () => {
     const dispatch = useDispatch()
     const navigate = useNavigate()

     const handleSignOut = async () => {
          try {
               await signOutUser()
               await dispatch(SET_LOGIN(false))
               navigate('/login')
          } catch (error) {
               toast.error(error)
          }
     }
     return (
          <div className="--pad header">
               <div className="--flex-between">
               <h3>
               <span className="--fw-thin">Welcome, </span>
               <span className="--color-danger">Zino</span>
               </h3>
               <button className="--btn --btn-danger" onClick={handleSignOut}>Logout</button>
               </div>
               <hr />
          </div>
     )
}

export default Header