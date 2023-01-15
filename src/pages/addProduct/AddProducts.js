import ProductForm from '../../components/productForm/ProductForm'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createProduct, selectIsLoading } from '../../redux/features/product/productSlice'
import { useState } from 'react'

const initalState = {
     name: '',
     category: '',
     quantity: '',
     price: '',
}

const AddProducts = () => {
     const dispatch = useDispatch()
     const navigate = useNavigate()
     const isLoading = useSelector(selectIsLoading)

     // Product Data
     const [product, setProduct] = useState(initalState)
     const [productImage, setProductImage] = useState('')
     const [imagePreview, setimagePreview] = useState(null)
     const [description, setDescription] = useState('')
     const { name, category, quantity, price } = product

     const handleInputChange = (e) => {
          const {name, value} = e.target
          setProduct({ ...product, [name]: value})
     }

     const handleImageChange = (e) => {
          setProductImage(e.target.file[0])
          setimagePreview(e.target.file[0])
     }

     const generateSKU = (category) => {
          const letters = category.slice(0, 3).toUpperCase()
          const numbers = Date.now()
          const sku = letters + '-' + numbers
          return sku
     }

     const saveProduct = async (e) => {
          e.preventDefault()
          const formData = new FormData()

          for (const key in product) {
               formData.append(key, product[key])
          }
          formData.append('sku', generateSKU(category))
          formData.append('image', productImage)
          console.log(...formData)

          await dispatch(createProduct(formData))
          navigate('/dashboard')
     }

     return (
          <ProductForm 
               title='Add New Product'
               product={product}
               productImage={productImage}
               imagePreview={imagePreview}
               description={description}
               handleInputChange={handleInputChange}
               handleImageChange={handleImageChange}
               saveProduct={saveProduct}
          />
     )
}

export default AddProducts