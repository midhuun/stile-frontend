//@ts-nocheck
import { createSlice } from "@reduxjs/toolkit";
const inititalState:any = []
const CartSlice = createSlice({
  name: "cart",
  initialState: inititalState,
  reducers:{
    addtoCart:(state:any,action)=>{
        const exist = state?.find((item:any)=>item.product._id===action.payload._id && item.selectedSize===action.payload.selectedSize);
        if(exist){
         const existingIndex = state.findIndex((item:any)=>item.product._id === action.payload._id && item.selectedSize === action.payload.selectedSize);
         state[existingIndex].quantity += 1
        }
        else{
            state.push({...action.payload,quantity:1})
        }
    },
    removeFromCart:(state:any,action)=>{
      return state.map((item:CartType)=>{
        if(item.product._id===action.payload._id && item.selectedSize===action.payload.selectedSize){
          return {...item,quantity:Math.max(1,item.quantity-1)}
        }
        else{
          return item;
        }
       })
  },
  deleteFromCart:(state:any,action)=>{
    return state.filter((item:CartType)=>item.product._id!==action.payload._id && item.selectedSize!==action.payload.selectedSize)
  },
  setcart:(state:any,action:any)=>{
    return action.payload;
  }
  },
});
export const {addtoCart,removeFromCart,deleteFromCart,setcart} = CartSlice.actions;
export default CartSlice.reducer;