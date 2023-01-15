import axios from "axios"

const API_URL = process.env.REACT_APP_BACKEND_URL
const API_Product_URL = `${API_URL}/api/products/`

// Create a Product
export const createProduct = async (productData) => {
     const response = await axios.post(API_Product_URL, productData)
     return response.data
}

const productService = {
     createProduct,
}
export default productService