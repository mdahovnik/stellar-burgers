import { configureStore } from '@reduxjs/toolkit';
import ingredientReducer from '../slices/ingredientsSlice/ingredientsSlice';
import constructorReducer from '../slices/constructorSlice/constructorSlice';
import feedReducer from '../slices/feedSlice/feedSlice';
import userReducer from '../slices/userSlice/userSlice';
import orderReducer from '../slices/orderSlice/orderSlice';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

const store = configureStore({
  reducer: {
    ingredients: ingredientReducer,
    burger: constructorReducer,
    feed: feedReducer,
    user: userReducer,
    order: orderReducer
  },
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
