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
}

// Create New Product
export const createProduct = createAsyncThunk(
     'products/create',
     async (productData, thunkAPI) => {
          try {
               return await productService.createProduct(productData)
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
          CAL_STORE_VALUE(store, action) {
               console.log('Store Value')
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
                    console.log(action.payload)
                    state.products.push(action.payload)
                    toast.success("Product Created")
               })
               .addCase(createProduct.rejected, (state, action) => {
                    state.isLoading = false
                    state.isError = true
                    state.message = action.payload
                    state.products.push(action.payload)
                    toast.error(action.payload)
               })
     }
});

export const {CAL_STORE_VALUE} = productSlice.actions

export const selectIsLoading = (state) => state.product.isLoading

export default productSlice.reducer