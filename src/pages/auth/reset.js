import React, { useState } from "react"
import styles from "./auth.module.scss"
import { MdPassword } from "react-icons/md"
import Card from "../../components/card/card"
import { Link, useParams } from "react-router-dom"
import { resetPassword } from "../../service/authService"
import { toast } from "react-toastify"

const initialState = {
  new_password: "apassword",
  comfirm_password: "apassword",
}

const Reset = () => {
  const [formData, setFormData] = useState(initialState)
  const {new_password, comfirm_password} = formData
  const {resetToken} =  useParams()

  const handleInputChange = (e) => {
    const {name, value} = e.target
    setFormData({...formData, [name]: value})
  }
  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validation
    if (!new_password, !comfirm_password)
        return toast.error('All fields are required')
    if (new_password !== comfirm_password)
        return toast.error('Passwords do not match')
    if (new_password.length < 8)
        return toast.error('passowrd must be 8 characters long')
    try {
      const data = await resetPassword({new_password, comfirm_password}, resetToken)
      toast.success(data.msg)
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  return (
    <div className={`container ${styles.auth}`}>
      <Card>
        <div className={styles.form}>
          <div className="--flex-center">
            <MdPassword size='35' color="#999" />
          </div>
          <h2>Reset Password</h2>

          <form onSubmit={handleSubmit}>
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
              name="comfirm_password"
              value={comfirm_password} 
              onChange={handleInputChange}
            />

            <button type="submit" className="--btn --btn-primary --btn-block">
              Reset Password
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

export default Reset