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
  ingredient: TIngredient | undefined;
  ingredients: TIngredient[];
}

const initialState: IIngredientsState = {
  isIngredientsLoading: false,
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
    selectIsIngredientsLoading: (state) => state.isIngredientsLoading,
    selectIngredients: (state) => state.ingredients,
    selectIngredientData: (state) => state.ingredient
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

export const { setIngredientById, clearIngredientById } =
  ingredientsSlice.actions;

export default ingredientsSlice.reducer;
