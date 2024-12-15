import { combineReducers, configureStore } from '@reduxjs/toolkit';
import ingredientReducer from '../services/slices/ingredientsSlice';
import constructorReducer from '../services/slices/constructorSlice';
import feedReducer from '../services/slices/feedSlice';
import userReducer from '../services/slices/userSlice';
//TODO: почистить
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

const rootReducer = combineReducers({
  burgerIngredients: ingredientReducer,
  burgerConstructor: constructorReducer,
  feed: feedReducer,
  userData: userReducer
});

// const rootReducer = combineReducers({
//   reducer: {
//     ingredients: ingredientReducer
//   }
// });
const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
