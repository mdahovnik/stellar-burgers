import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit';
import { getIngredientsApi } from '@api';
import { TIngredient } from '@utils-types';

export interface IIngredientsState {
  isIngredientsLoading: boolean;
  error: string | null | undefined;
  ingredients: TIngredient[];
}

const initialState: IIngredientsState = {
  isIngredientsLoading: false,
  error: null,
  ingredients: []
};

export const getIngredients = createAsyncThunk(
  'ingredients/getAll',
  async () => await getIngredientsApi()
);

const ingredientsSlice = createSlice({
  name: 'ingredientsData',
  initialState,
  reducers: {},
  selectors: {
    selectIsIngredientsLoading: (state: IIngredientsState) =>
      state.isIngredientsLoading,
    selectIngredients: (state: IIngredientsState) => state.ingredients,
    selectIngredientData: (state: IIngredientsState, id: string) =>
      state.ingredients.find((item) => item._id === id)
  },
  extraReducers: (builder: ActionReducerMapBuilder<IIngredientsState>) => {
    builder
      .addCase(getIngredients.pending, (state: IIngredientsState) => {
        state.isIngredientsLoading = true;
        state.error = null;
      })
      .addCase(getIngredients.rejected, (state: IIngredientsState, action) => {
        state.isIngredientsLoading = false;
        state.error = action.error.message;
      })
      .addCase(
        getIngredients.fulfilled,
        (state: IIngredientsState, action: PayloadAction<TIngredient[]>) => {
          state.ingredients = action.payload;
          state.isIngredientsLoading = false;
        }
      );
  }
});

export const {
  selectIngredients,
  selectIngredientData,
  selectIsIngredientsLoading
} = ingredientsSlice.selectors;
export default ingredientsSlice.reducer;
