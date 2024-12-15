import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit';
import { getIngredientsApi } from '@api';
import { TIngredient } from '@utils-types';

export interface IIngredientsState {
  isLoading: boolean;
  error: string | null | undefined;
  ingredients: TIngredient[];
}

export const initialState: IIngredientsState = {
  isLoading: false,
  error: null,
  ingredients: []
};

export const getIngredients = createAsyncThunk(
  'ingredients/getAll',
  async () => await getIngredientsApi()
);

const ingredientsSlice = createSlice({
  name: 'burgerIngredients',
  initialState,
  reducers: {},
  selectors: {
    selectIsIngredientsLoading: (state: IIngredientsState) => state.isLoading,
    selectIngredients: (state: IIngredientsState) => state.ingredients,
    selectIngredientData: (state: IIngredientsState, id: string) =>
      state.ingredients.find((item) => item._id === id)
  },
  extraReducers: (builder: ActionReducerMapBuilder<IIngredientsState>) => {
    builder
      .addCase(getIngredients.pending, (state: IIngredientsState) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getIngredients.rejected, (state: IIngredientsState, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(
        getIngredients.fulfilled,
        (state: IIngredientsState, action: PayloadAction<TIngredient[]>) => {
          state.ingredients = action.payload;
          state.isLoading = false;
        }
      );
  }
});

export const { selectIngredients, selectIngredientData } =
  ingredientsSlice.selectors;
export default ingredientsSlice.reducer;
