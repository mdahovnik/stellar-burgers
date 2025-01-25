import {
  ActionReducerMapBuilder,
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { TIngredientsState } from './type';
import { getIngredients } from './ingredients-thunk';
import { RootState } from '../../store/store';

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
  },
  selectors: {
    selectIsIngredientsLoading: (state) => state.isLoading,
    selectIngredients: (state) => state.ingredients
  }
});

export const selectIngredientsById =
  (id: string | undefined) =>
  ({ ingredients }: RootState) =>
    ingredients.ingredients.find((item) => item._id === id);

export const { selectIsIngredientsLoading, selectIngredients } =
  ingredientsSlice.selectors;
export default ingredientsSlice.reducer;
