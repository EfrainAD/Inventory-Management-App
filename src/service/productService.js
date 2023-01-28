import axios from "axios"

const API_URL = process.env.REACT_APP_BACKEND_URL
const API_Product_URL = `${API_URL}/api/products/`

// convert price, to money format ex. $5,000.00
export const moneyFormat = (value) => {
    const money = new Intl.NumberFormat('en-US', {
          minimumFractionDigits: 2,      
          maximumFractionDigits: 2,
        }).format(value)
     return '$' + money
}

// Create a Product
export const createProduct = async (formData) => {
     const response = await axios.post(API_Product_URL, formData)
     return response.data
}
// Get all Products
export const getProducts = async () => {
     const response = await axios.get(API_Product_URL)
     return response.data
}
// Get a Product
export const getProduct = async (id) => {
     const response = await axios.get(API_Product_URL + id)
     return response.data[0]
}
// Update a Product
export const updateProduct = async (id, formData) => {
     const response = await axios.patch(`${API_Product_URL}${id}`, formData)
     return response.data
}
// DELETE a product
export const deleteProduct = async (id) => {
     const response = await axios.delete(API_Product_URL + id)
     console.log('res', response)
     return response.data
}

const productService = {
     createProduct,
     getProducts,
     getProduct,
     updateProduct,
     deleteProduct,
}
export default productService