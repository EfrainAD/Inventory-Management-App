import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Card from '../../components/card/card'
import ChangePassword from '../../components/changePassword/ChangePassword'
import Loader from '../../components/loader/loader'
import useRedirectLoggedOutUser from '../../custom-hook/useRedirectLoggedOutUser'
import { selectIsLoggedIn, selectUser, SET_USER, SET_NAME } from '../../redux/features/auth/authSlice'
import { getCloudinarySignature, getUserProfile, updateUserProfile } from '../../service/authService'

const EditProfile = () => {
     useRedirectLoggedOutUser('/login')
     const dispatch = useDispatch()
     const navigate = useNavigate()
     
     const [isLoading, setIsLoading] = useState(false)
     const [isLoggedIn, setIsLoggedIn] = useState(useSelector(selectIsLoggedIn))
     const [user, setUser] = useState(null)
     const [userPhoto, setUserPhoto] = useState(null)
     
     useEffect(() => {
          const asyncFun = async () => {
               setIsLoading(true)
               const userData = await getUserProfile()
               dispatch(SET_USER(userData))
               dispatch(SET_NAME(userData.name))
               setUser(userData)
               setIsLoading(false)
          }
          asyncFun()
     }, [dispatch])
     
     const handleInputChange = (e) => {
          const {name, value} = e.target
          setUser({...user, [name]: value})
     }
     const handleImageChange = (e) => {
          setUserPhoto(e.target.files[0])
     }
     // Submit Profile Update
     const handleSubmit = async (e) => {
          e.preventDefault()
          setIsLoading(true)
          // Upload image to cloudinary
          let imageURL = null
          if (userPhoto) {
               try {
                    if (userPhoto && (
                         userPhoto.type === "image/jpeg" ||
                         userPhoto.type === "image/jpg" ||
                         userPhoto.type === "image/png")
                    ) {
                         // Get needed auth/signature for Cludinary.
                         const signatureObt = await getCloudinarySignature()
                         console.log('signature', signatureObt)
                         
                         const {timestamp, signature, api_key} = signatureObt
     
                         // Set up Form Data for the image and auth
                         const formData = new FormData();
                         formData.append("file", userPhoto)
                         formData.append("api_key", api_key)
                         formData.append("signature", signature)
                         formData.append("timestamp", timestamp)
                         formData.append("timestamp", timestamp)
                         formData.append("folder", 'Inventory Management App')
                         formData.append("public_id", user._id)
                         
                         // Post to Cloudinary
                         const cloudinaryImg = await fetch('https://api.cloudinary.com/v1_1/dnzmydq91/image/upload', {
                              method: 'POST',
                              body: formData,
                         })
                         // Get URL for the new image uploaded to Cloudinary
                         const imageData = await cloudinaryImg.json()
                         imageURL = imageData.url
                    } else {
                         toast.error('Image is not a valid file type, it was ignored')
                    }
               } catch (error) {
                    console.log('error', error)
               }
          }
          if (imageURL === null) 
               imageURL = user.photo
          // Patch/update the UserData
          await updateUserProfile({...user, photo: imageURL})

          toast.success("Update Successful");
          navigate('/dashboard/profile')
          setIsLoading(false)
     }

     return (
          <div className="profile --my2">
               {isLoading && <Loader />}
     
               <Card cardClass={"card --flex-dir-column"}>
                    <span className="profile-photo">
                         <img src={user?.photo} alt="profile pic" />
                    </span>
                    <form className="--form-control --m" onSubmit={handleSubmit}>
                         <span className="profile-data">
                              <p>
                                   <label>Name:</label>
                                   <input
                                        type="text"
                                        name="name"
                                        value={user?.name}
                                        onChange={handleInputChange}
                                        data-lpignore="true"
                                   />
                              </p>
                              <p>
                                   <label>Email:</label>
                                   <input type="text" name="email" value={user?.email} disabled />
                                   <br />
                                   <code>Email cannot be changed.</code>
                              </p>
                              <p>
                                   <label>Phone:</label>
                                   <input
                                        type="text"
                                        name="phone"
                                        value={user?.phone}
                                        onChange={handleInputChange}
                                   />
                              </p>
                              <p>
                                   <label>Bio:</label>
                                   <textarea
                                        name="bio"
                                        value={user?.bio}
                                        onChange={handleInputChange}
                                        cols="30"
                                        rows="10"
                                   ></textarea>
                              </p>
                              <p>
                                   <label>Photo:</label>
                                   <input type="file" name="image" onChange={handleImageChange} />
                              </p>
                              <div>
                                   <button className="--btn --btn-primary">
                                        Edit Profile
                                   </button>
                              </div>
                         </span>
                    </form>
               </Card>
               <br />
               <ChangePassword />
          </div>
     )
}

export default EditProfile