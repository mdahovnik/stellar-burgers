import {
  ActionReducerMapBuilder,
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { RootState } from '../../store';
import { TIngredientsState } from './type';
import { getIngredients } from './ingredients-thunk';

export const initialState: TIngredientsState = {
  isLoading: false,
  error: null,
  ingredients: []
};

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<TIngredientsState>) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getIngredients.rejected, (state, { error }) => {
        state.isLoading = false;
        state.error = error.message;
      })
      .addCase(
        getIngredients.fulfilled,
        (state, { payload }: PayloadAction<TIngredient[]>) => {
          state.ingredients = payload;
          state.isLoading = false;
        }
      );
  }
});

export const selectIsIngredientsLoading = ({ ingredients }: RootState) =>
  ingredients.isLoading;
export const selectIngredients = ({ ingredients }: RootState) =>
  ingredients.ingredients;
export const selectIngredientsById = (id: string) => (state: RootState) =>
  state.ingredients.ingredients.find((item) => item._id === id);

export default ingredientsSlice.reducer;
