import { createSlice } from '@reduxjs/toolkit'

const initialState = {
     filteredProducts: []
}

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
          fILTER_PRODUCTS(state, action) {
               const {products, search } = action.payload
               
               const filteredProducts = products.filter(product => product.name.toLowerCase().includes(search) || product.category.toLowerCase().includes(search)) 

               state.filteredProducts = filteredProducts
          }
  }
});

export const {fILTER_PRODUCTS} = filterSlice.actions
export const selectFilterProducts = (state) => state.filter.filteredProducts

export default filterSlice.reducer