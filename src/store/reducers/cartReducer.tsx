import { createSlice } from "@reduxjs/toolkit";

// Define types
type CartItem = {
  product: {
    _id: string;
    name: string;
    price: number;
    description: string;
    images: string[];
    sizes: { size: string; stock: number }[];
    category: string;
    slug: string;
    discount?: number;
    discountedPrice?: number;
  };
  selectedSize: string;
  quantity: number;
};

type CartState = CartItem[];

// Initial state
const initialState: CartState = [];

// Create the slice
const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addtoCart: (state, action) => {
      const existIndex = state.findIndex(
        (item) =>
          item.product._id === action.payload._id &&
          item.selectedSize === action.payload.selectedSize
      );

      if (existIndex !== -1) {
        state[existIndex].quantity += 1;
      } else {
        state.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      return state
        .map((item) => {
          if (
            item.product._id === action.payload._id &&
            item.selectedSize === action.payload.selectedSize
          ) {
            return { ...item, quantity: item.quantity - 1 };
          }
          return item;
        })
        .filter((item) => item.quantity > 0); // Remove items with quantity 0
    },
    deleteFromCart: (state, action) => {
      return state.filter(
        (item) =>
          item.product._id !== action.payload._id ||
          item.selectedSize !== action.payload.selectedSize
      );
    },
    setcart: (_, action) => {
      return action.payload; // Replace the cart with the new payload
    },
  },
});

// Export actions and reducer
export const { addtoCart, removeFromCart, deleteFromCart, setcart } =
  CartSlice.actions;

export default CartSlice.reducer;
