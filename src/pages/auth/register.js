import React, { useState } from "react"
import { Link, Navigate, useNavigate } from "react-router-dom"
import styles from "./auth.module.scss"
import { TiUserAddOutline } from "react-icons/ti"
import { toast } from "react-toastify"
import Card from "../../components/card/card"
import { registerUser, validateEmail } from "../../service/authService"
import { SET_LOGIN, SET_NAME } from "../../redux/features/auth/authSlice"
import {useDispatch} from 'react-redux'
import Loader from "../../components/loader/loader"

const initialState = {
     name: '',
     email: '',
     password: '',
     comfirm_password: '',
}

const Register = () => {
     const dispatch = useDispatch()
     const navigate = useNavigate()
     const [isLoading, setIsLoading] = useState(false)
     const [formData, setFormData] = useState(initialState)
     const {name, email, password, comfirm_password} = formData

     const handleInputChange = (e) => {
          const {name, value} = e.target
          setFormData({...formData, [name]: value})
     }
     const register = async (e) => {
          e.preventDefault()
          // Validation
          if (!name, !email, !password, !comfirm_password)
               return toast.error('All fields are required')
          if (password !== comfirm_password)
               return toast.error('Passwords do not match')
          if (password.length < 8)
               return toast.error('passowrd must be 8 characters long')
          if (!validateEmail(email))
               return toast.error('Email not valid')
          const userData = {
               name,
               email,
               password
          }
          setIsLoading(true)
          try {
               const data = await registerUser(userData)
               await dispatch(SET_LOGIN(true))
               await dispatch(SET_NAME(data.name))
               navigate('/dashboard')
               setIsLoading(false)
          } catch (error) {
               setIsLoading(false)
               console.log(error.message)
          }
     }
     return (
     <div className={`container ${styles.auth}`}>
          {isLoading && <Loader />}
          <Card>
               <div className={styles.form}>
                    <div className="--flex-center">
                    <TiUserAddOutline size={35} color="#999" />
                    </div>
                    <h2>Register</h2>

                    <form onSubmit={register}>
                         <input type="text" placeholder="Name" required name="name" value={name} onChange={handleInputChange} />
                         <input type="email" placeholder="Email" required name="email" value={email} onChange={handleInputChange} />
                         <input
                              type="password"
                              placeholder="Password"
                              required
                              name="password"
                              value={password}
                              onChange={handleInputChange}
                         />
                         <input
                              type="password"
                              placeholder="Confirm Password"
                              required
                              name="comfirm_password"
                              value={comfirm_password}
                              onChange={handleInputChange}
                         />
                         <button type="submit" className="--btn --btn-primary --btn-block">
                         Register
                         </button>
                    </form>

                    <span className={styles.register}>
                    <Link to="/">Home</Link>
                    <p> &nbsp; Already have an account? &nbsp;</p>
                    <Link to="/login">Login</Link>
                    </span>
               </div>
          </Card>
     </div>
  )
}

export default Register
