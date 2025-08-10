import { apiUrl } from '../../utils/api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const res = await fetch(apiUrl('/products'));
  const data = await res.json();
  return data;
});

const ProductSlice = createSlice({
  name: 'products',
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (_, action) => {
      return action.payload;
    });
  },
});

export default ProductSlice.reducer;
