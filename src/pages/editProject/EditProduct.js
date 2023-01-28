import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { SpinningImg } from '../../components/loader/loader'
import ProductForm from '../../components/product/productForm/ProductForm'
import useRedirectLoggedOutUser from '../../custom-hook/useRedirectLoggedOutUser'
import { getProduct, getProducts, selectIsLoading, selectProduct, updateProduct } from '../../redux/features/product/productSlice'

const EditProduct = () => {
     useRedirectLoggedOutUser('/login')

     const dispatch = useDispatch()
     const navigate = useNavigate()

     const {id} =  useParams()
     const productInSlice = useSelector(selectProduct)
     const productEdit = productInSlice?._id === id ? productInSlice : null
     const isLoading = useSelector(selectIsLoading)
     // Product Data
     const [product, setProduct] = useState(null)
     const [productImage, setProductImage] = useState('')
     const [imagePreview, setimagePreview] = useState(null)
     const [description, setDescription] = useState('')
     
     useEffect(() => {
          dispatch(getProduct(id))
     }, [dispatch, id])

     useEffect(() => {
          setProduct(productEdit)
          
          setimagePreview(
               productEdit && productEdit.image ? `${productEdit.image.filePath}` : null
          )
          
          setDescription(
               productEdit && productEdit.description ? productEdit.description : ''
          )
     }, [productEdit])
     
     const handleInputChange = (e) => {
          const {name, value} = e.target
          setProduct({ ...product, [name]: value})
     }

     const handleImageChange = (e) => {
          setProductImage(e.target.files[0])
          setimagePreview(URL.createObjectURL(e.target.files[0]))
     }
     const saveProduct = async (e) => {
          e.preventDefault()
          
          const formData = new FormData()
          formData.append("name", product?.name)
          formData.append("category", product?.category)
          formData.append("quantity", product?.quantity)
          formData.append("price", product?.price)
          formData.append('description', description)
          console.log('productImage', productImage)
          if (productImage) {
               formData.append('image', productImage)
          }

          console.log('Data form being sent', ...formData)

          await dispatch(updateProduct({id, formData}))
          await dispatch(getProducts())
          navigate('/dashboard/product-detail/' + id)
     }

     return (
          <div>
               {isLoading && <SpinningImg />}
               <ProductForm 
                    title={'Edit Product'} 
                    product={product} 
                    productImage={productImage}
                    imagePreview={imagePreview}
                    description={description}
                    setDescription={setDescription}
                    handleInputChange={handleInputChange}
                    handleImageChange={handleImageChange}
                    saveProduct={saveProduct}
               />
          </div>
     )
}

export default EditProduct