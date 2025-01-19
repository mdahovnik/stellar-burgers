import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit';
import { getIngredientsApi } from '@api';
import { TIngredient } from '@utils-types';
import { RootState } from '../../store';

export type TIngredientsState = {
  isLoading: boolean;
  error: string | null | undefined;
  ingredients: TIngredient[];
};

const initialState: TIngredientsState = {
  isLoading: false,
  error: null,
  ingredients: []
};

export const getIngredients = createAsyncThunk(
  'ingredients/getAll',
  async () => await getIngredientsApi()
);

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    selectIsIngredientsLoading: (state) => state.isLoading,
    selectIngredients: (state) => state.ingredients
  },
  extraReducers: (builder: ActionReducerMapBuilder<TIngredientsState>) => {
    builder
      .addCase(getIngredients.pending, (state: TIngredientsState) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getIngredients.rejected, (state: TIngredientsState, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(
        getIngredients.fulfilled,
        (state: TIngredientsState, action: PayloadAction<TIngredient[]>) => {
          state.ingredients = action.payload;
          state.isLoading = false;
        }
      );
  }
});

export const { selectIngredients, selectIsIngredientsLoading } =
  ingredientsSlice.selectors;

export const selectIngredientsById = (id: string) => (state: RootState) =>
  state.ingredients.ingredients.find((item) => item._id === id);

export default ingredientsSlice.reducer;
