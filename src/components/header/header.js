import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { selectIsLoggedIn, selectName, SET_LOGIN, SET_NAME, SET_USER } from "../../redux/features/auth/authSlice"
import { getUserProfile, signOutUser } from "../../service/authService"

const Header = () => {
     const dispatch = useDispatch()
     const navigate = useNavigate()
     const name = useSelector(selectName)
     const isLoggedIn = useSelector(selectIsLoggedIn)

     useEffect(() => {
          const runAsync = async () => {
               if (!isLoggedIn) return
               
               const user = await getUserProfile()
               if (user) {
                    dispatch(SET_USER(user))
                    dispatch(SET_NAME(user.name))
               }
          }

          runAsync()
     }, [dispatch, name, isLoggedIn])

     const handleSignOut = async () => {
          await signOutUser()
          dispatch(SET_LOGIN(false))
          navigate('/login')
     }
     return (
          <div className="--pad header">
               <div className="--flex-between">
               <h3>
               <span className="--fw-thin">Welcome, </span>
               <span className="--color-danger">{name}</span>
               </h3>
               <button className="--btn --btn-danger" onClick={handleSignOut}>Logout</button>
               </div>
               <hr />
          </div>
     )
}

export default Header