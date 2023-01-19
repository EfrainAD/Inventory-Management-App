import { createSlice, createAsyncThunk, isAsyncThunkAction } from '@reduxjs/toolkit'
import { toast } from 'react-toastify';
import productService from '../../../service/productService';

const initialState = {
     product: null,
     products: [],
     isError: false,
     isSuccess: false,
     isLoading: false,
     message: '',
     totalStoreValue: 0,
     outOfStock: 0,
     category: [],
}

// Create New Product
export const createProduct = createAsyncThunk(
     'products/create',
     async (formData, thunkAPI) => {
          try {
               return await productService.createProduct(formData)
          } catch (error) {
               const errorMessage = (error.response && error.response.data && error.response.msg) 
               || error.message 
               || error.toString()
               console.log(errorMessage)
               return thunkAPI.rejectWithValue(errorMessage)
          }
     }
)
// Get All Product
export const getProducts = createAsyncThunk(
     'products/getAll',
     async (_, thunkAPI) => {
          try {
               return await productService.getProducts()
          } catch (error) {
               const errorMessage = (error.response && error.response.data && error.response.msg) 
               || error.message 
               || error.toString()
               console.log(errorMessage)
               return thunkAPI.rejectWithValue(errorMessage)
          }
     }
)

const productSlice = createSlice({
     name: 'product',
     initialState,
     reducers: {
          CAL_STORE_VALUE(state, action) {
               const products = action.payload
               const totalValue = products.reduce((sum, product) => {
                    const {price, quantity} = product
                    return sum += price * quantity
                 }, 0)
               state.totalStoreValue = totalValue
          },
          CAL_OUT_OF_STOCK(state, action) {
               const products = action.payload
               state.outOfStock = products.reduce(
                    (totalOutOfStock, product) => 
                    product.quantity === '0' ?
                    totalOutOfStock+1 : totalOutOfStock, 0 )
          },
          CAL_CATEGORY(state, action) {
               const products = action.payload

               const categories = products.map((product) => product.category)
               const categorySet = [...new Set(categories)]
               
               state.category = categorySet
          },
     },
     extraReducers: (builder) => { 
          builder
               .addCase(createProduct.pending, (state) => {
                    state.isLoading = true
               })
               .addCase(createProduct.fulfilled, (state, action) => {
                    state.isLoading = false
                    state.isSuccess = true
                    state.isError = false
                    console.log(action.payload)
                    state.products.push(action.payload)
                    toast.success("Product Created")
               })
               .addCase(createProduct.rejected, (state, action) => {
                    state.isLoading = false
                    state.isError = true
                    state.message = action.payload
                    toast.error(action.payload)
               })
               .addCase(getProducts.pending, (state) => {
                    state.isLoading = true
               })
               .addCase(getProducts.fulfilled, (state, action) => {
                    state.isLoading = false
                    state.isSuccess = true
                    state.isError = false
                    console.log(action.payload)
                    state.products = action.payload
               })
               .addCase(getProducts.rejected, (state, action) => {
                    state.isLoading = false
                    state.isError = true
                    state.message = action.payload
                    toast.error(action.payload)
               })
     }
});

export const {CAL_STORE_VALUE} = productSlice.actions
export const {CAL_OUT_OF_STOCK} = productSlice.actions
export const {CAL_CATEGORY} = productSlice.actions

export const selectIsLoading = (state) => state.product.isLoading
export const selectTotalStoreValue = (state) => state.product.totalStoreValue
export const selectOutOfStock = (state) => state.product.outOfStock
export const selectCategory = (state) => state.product.category

export default productSlice.reducer