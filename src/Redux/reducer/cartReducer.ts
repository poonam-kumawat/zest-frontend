import { createSlice } from '@reduxjs/toolkit'

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    productList:[],
    totalAmount:0,
    itemCount:0,
  },
  reducers: {
    // increment: (state) => {
    //   state.totalAmount += 1
    // },
    // decrement: (state) => {
    //   state.totalAmount -= 1
    // },
    // incrementByAmount: (state, action) => {
    //   state.totalAmount += action.payload
    // },
    
    addProduct:(state,action)=>{
        const list = [...state.productList]
        const cards:any=action.payload
        // list.push(cards)
        state.productList = [...list]
    }
  },
})

export const { addProduct } = cartSlice.actions

export default cartSlice.reducer