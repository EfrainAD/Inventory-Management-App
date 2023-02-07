import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Card from '../../components/card/card'
import { SpinningImg } from '../../components/loader/loader'
import useRedirectLoggedOutUser from '../../custom-hook/useRedirectLoggedOutUser'
import { selectIsLoggedIn, selectUser, SET_NAME, SET_USER } from '../../redux/features/auth/authSlice'
import { getUserProfile } from '../../service/authService'
import './profile.scss'

const Profile = () => {
     useRedirectLoggedOutUser('/login')
     const dispatch = useDispatch()

     const [isLoading, setIsLoading] =  useState(true)
     const [isLoggedIn, setIsLoggedIn] = useState(useSelector(selectIsLoggedIn))
     const [profile, setProfile] = useState(useSelector(selectUser))

     useEffect(() => {
          const asyncFun = async () => {
               const user = await getUserProfile()
               dispatch(SET_USER(user))
               dispatch(SET_NAME(user.name))
               setProfile(user)
               setIsLoading(false)
          }
          if (isLoggedIn) 
               asyncFun()
     }, [dispatch])
     
     return (
          <div className="profile --my2">
               {isLoading && <SpinningImg />}
               {!isLoading && profile === null ? 
               (
                    <p>Something went wrong, please reload the page...</p>
               ):(
                    <Card cardClass={"card --flex-dir-column"}>
                         <span className="profile-photo">
                              <img src={profile?.photo} alt="profilepic" />
                         </span>
                         <span className="profile-data">
                              <p>
                                   <b>Name : </b> {profile?.name}
                              </p>
                              <p>
                                   <b>Email : </b> {profile?.email}
                              </p>
                              <p>
                                   <b>Phone : </b> {profile?.phone}
                              </p>
                              <p>
                                   <b>Bio : </b> {profile?.bio}
                              </p>
                              <div>
                                   <Link to="/dashboard/profile-update">
                                        <button className="--btn --btn-primary">
                                             Edit Profile
                                        </button>
                                   </Link>
                              </div>
                         </span>
                    </Card>
               )
          }
          </div>
     )
}

export default Profile