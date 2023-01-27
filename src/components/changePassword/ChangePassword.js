import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { changePassword } from '../../service/authService'
import Card from '../card/card'
import './changePassword.scss'

const ChangePassword = () => {
     const navigate = useNavigate()
     
     const [formData, setFormData] = useState({old_password: '', new_password: '', comferm_password: ''})
     const { old_password, new_password, comferm_password } = formData
     
     const handleInputChange = (e) => {
          const {name, value} = e.target
          setFormData({...formData, [name]: value})
     }
     const handleSubmit = async (e) => {
          e.preventDefault()
          // Validation
          if (new_password !== comferm_password) {
               throw new Error('Passwords and comform password do not match')
          }
          
          await changePassword(formData)
          navigate('/dashboard/profile')
     }
     return (
          <div className="change-password">
               <Card cardClass={"password-card"}>
                    <h3>Change Password</h3>
                    <form onSubmit={handleSubmit} className="--form-control">
                         <input
                              type="password"
                              placeholder="Old Password"
                              required
                              name="old_password"
                              value={old_password}
                              onChange={handleInputChange}
                         />
                         <input
                              type="password"
                              placeholder="New Password"
                              required
                              name="new_password"
                              value={new_password}
                              onChange={handleInputChange}
                         />
                         <input
                              type="password"
                              placeholder="Confirm New Password"
                              required
                              name="comferm_password"
                              value={comferm_password}
                              onChange={handleInputChange}
                         />
                         <button type="submit" className="--btn --btn-primary">
                              Change Password
                         </button>
                    </form>
               </Card>
          </div>
     )
}

export default ChangePassword