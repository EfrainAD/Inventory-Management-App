import axios from "axios"

const API_URL = process.env.REACT_APP_BACKEND_URL
const API_Product_URL = `${API_URL}/api/products/`

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
     deleteProduct,
}
export default productService