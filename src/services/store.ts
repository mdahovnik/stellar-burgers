import { combineReducers, configureStore } from '@reduxjs/toolkit';
import ingredientReducer from './slices/ingredientsSlice/ingredientsSlice';
import constructorReducer from './slices/constructorSlice/constructorSlice';
import feedReducer from './slices/feedSlice/feedSlice';
import userReducer from './slices/userSlice/userSlice';
import orderReducer from './slices/orderSlice/orderSlice';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

const rootReducer = combineReducers({
  ingredients: ingredientReducer,
  burger: constructorReducer,
  feed: feedReducer,
  user: userReducer,
  order: orderReducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
