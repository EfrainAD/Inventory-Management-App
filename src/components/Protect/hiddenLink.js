import { useSelector } from "react-redux"
import { selectIsLoggedIn, selectName } from "../../redux/features/auth/authSlice"

export const ShowLogIn = ({children}) => {
     const isLoggedIn = useSelector(selectIsLoggedIn)
     const name = useSelector(selectName)
     console.log('isLoggedIn', isLoggedIn)
     console.log('name', name)
     if (isLoggedIn)
          return <>{children}</>
     else 
          return null
}

export const ShowLogOut = ({children}) => {
     const isLoggedIn = useSelector(selectIsLoggedIn)
     if (!isLoggedIn)
          return <>{children}</>
     else 
          return null
}