import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
     product: null,
     products: [],
     isError: false,
     isSuccess: false,
     isLoading: false,
     message: '',
}

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
     CAL_STORE_VALUE(store, action) {
          console.log('Store Value')
     },
  },
  extraReducers: (builder) => { 
     
   }
});

export const {CAL_STORE_VALUE} = productSlice.actions

export default productSlice.reducer