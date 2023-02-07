import React, { useState } from "react"
import styles from "./auth.module.scss"
import { AiOutlineMail } from "react-icons/ai"
import Card from "../../components/card/card"
import { Link, useNavigate } from "react-router-dom"
import Loader from "../../components/loader/loader"
import { sendResetEmail, validateEmail } from "../../service/authService"

import { toast } from "react-toastify"
import useRedirectLoggedInUser from "../../custom-hook/useRedirectLoggedInUser"

const initialState = {
     email: '',
}

const Forgot = () => {
     useRedirectLoggedInUser()
     const navigate = useNavigate()
     const [isLoading, setIsLoading] = useState(false)
     const [formData, setFormData] = useState(initialState)
     const {email} = formData
     
     const handleInputChange = (e) => {
          const {name, value} = e.target
          setFormData({...formData, [name]: value})
     }
     const handdleSendResetEmail = async (e) => {
          e.preventDefault()
          // Validation
          if (!email)
               return toast.error('Email field is required')
          if (!validateEmail(email))
               return toast.error('Email not valid')
          
          // Send Reset Email
          setIsLoading(true)
          try {
               await sendResetEmail(formData)
               setFormData(initialState)
               setIsLoading(false)
          } catch (error) {
               setIsLoading(false)
          }
     }

     return (
          <div className={`container ${styles.auth}`}>
               {isLoading && <Loader />}
               <Card>
               <div className={styles.form}>
                    <div className="--flex-center">
                    <AiOutlineMail size='35' color="#999" />
                    </div>
                    <h2>Forgot Password</h2>

                    <form onSubmit={handdleSendResetEmail}>
                         <input 
                              type="email"
                              required 
                              placeholder="Email"
                              name="email"
                              value={email}
                              onChange={handleInputChange}
                         />

                         <button type="submit" className="--btn --btn-primary --btn-block">
                              Get Reset Email
                         </button>
                         <div className={styles.links}>
                              <p>
                                   <Link to="/">- Home</Link>
                              </p>
                              <p>
                                   <Link to="/login">- Login</Link>
                              </p>
                         </div>
                    </form>
               </div>
               </Card>
          </div>
     )
}

export default Forgot