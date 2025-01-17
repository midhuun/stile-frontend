import { createSlice } from "@reduxjs/toolkit";
const inititalState:any = []
const ProductSlice = createSlice({
  name: "products",
  initialState: inititalState,
  reducers:{
    setProduct:(__,action)=>{
        return action.payload
    }
  }
})
export const { setProduct } = ProductSlice.actions;
export default ProductSlice.reducer;