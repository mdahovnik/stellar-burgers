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
  ingredient: TIngredient | undefined;
  ingredients: TIngredient[];
}

const initialState: IIngredientsState = {
  isLoading: false,
  error: null,
  ingredient: undefined,
  ingredients: []
};

export const getIngredients = createAsyncThunk(
  'ingredients/getAll',
  async () => await getIngredientsApi()
);

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    setIngredientById(state, action: PayloadAction<{ id: string }>) {
      state.ingredient = state.ingredients.find(
        (item) => item._id === action.payload.id
      );
    },
    clearIngredientById(state) {
      state.ingredient = undefined;
    }
  },
  selectors: {
    selectIsIngredientsLoading: (state) => state.isLoading,
    selectIngredients: (state) => state.ingredients,
    selectIngredientData: (state) => state.ingredient
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

export const {
  selectIngredients,
  selectIngredientData,
  selectIsIngredientsLoading
} = ingredientsSlice.selectors;

export const { setIngredientById, clearIngredientById } =
  ingredientsSlice.actions;

export default ingredientsSlice.reducer;
