import { useSelector } from "react-redux"
import { selectIsLoggedIn } from "../../redux/features/auth/authSlice"

export const ShowLogIn = ({children}) => {
     const isLoggedIn = useSelector(selectIsLoggedIn)
     return isLoggedIn ? <>{children}</> : null
     // if (isLoggedIn)
     //      return <>{children}</>
     // else 
     //      return null
}

export const ShowLogOut = ({children}) => {
     const isLoggedIn = useSelector(selectIsLoggedIn)
     return isLoggedIn ? null : <>{children}</>
     // if (!isLoggedIn)
     //      return <>{children}</>
     // else 
     //      return null
}