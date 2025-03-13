import { configureStore } from '@reduxjs/toolkit';
import CartReducer from './reducers/cartReducer';
import ProductReducer from './reducers/productReducer';

const store = configureStore({
  reducer: {
    Cart: CartReducer,
    Products: ProductReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
