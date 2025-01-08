import {configureStore} from '@reduxjs/toolkit';
import CartReducer from './reducers/cartReducer';
const store = configureStore({
    reducer: {
       Cart:CartReducer
    }
})

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

