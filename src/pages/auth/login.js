import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {BiLogIn} from 'react-icons/bi'
import Card from '../../components/card/card'
import styles from './auth.module.scss'
import { signInUser, validateEmail } from '../../service/authService'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import Loader from '../../components/loader/loader'
import { SET_LOGIN, SET_NAME } from '../../redux/features/auth/authSlice'

const initialState = {
     email: '',
     password: '',
}

const Login = () => {
     const dispatch = useDispatch()
     const navigate = useNavigate()
     const [isLoading, setIsLoading] = useState(false)
     const [formData, setFormData] = useState(initialState)
     const {email, password} = formData
     
     const handleInputChange = (e) => {
          const {name, value} = e.target
          setFormData({...formData, [name]: value})
     }
     const handdleSignInUser = async (e) => {
          e.preventDefault()
           // Validation
           if (!email, !password)
               return toast.error('All fields are required')
          if (password.length < 8)
               return toast.error('passowrd must be 8 characters long')
          if (!validateEmail(email))
               return toast.error('Email not valid')
          
          // Login User
          setIsLoading(true)
          try {
               const user = await signInUser(formData)
               console.log('user', user)
               await dispatch(SET_LOGIN(true))
               await dispatch(SET_NAME(user.name))
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
               <BiLogIn size='35' color="#999" />
          </div>

          <h2>Login</h2>
          <form onSubmit={handdleSignInUser}>
               <input 
                    type="email" 
                    required 
                    placeholder="Email" 
                    name="email" 
                    value={email} 
                    onChange={handleInputChange}
               />
               <input
                    type="password"
                    required
                    placeholder="Password"
                    name="password"
                    value={password} 
                    onChange={handleInputChange}
               />
               <button type="submit" className="--btn --btn-primary --btn-block">
               Login
               </button>
          </form>
          <Link to="/forgot">Forgot Password</Link>

          <span className={styles.register}>
               <Link to="/">Home</Link>
               <p> &nbsp; Don't have an account? &nbsp;</p>
               <Link to="/register">Register</Link>
          </span>
          </div>
          </Card>
     </div>
     )
}

export default Login