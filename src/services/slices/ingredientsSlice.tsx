import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit';
import { getIngredientsApi } from '../../utils/burger-api';
import { TConstructorIngredient, TIngredient } from '../../utils/types';

export interface IIngredientsState {
  isLoading: boolean;
  error: string | null | undefined;
  ingredients: TIngredient[];
  constructorItems: {
    bun: TIngredient | undefined;
    ingredients: TConstructorIngredient[];
  };
}

export const initialState: IIngredientsState = {
  isLoading: false,
  error: null,
  ingredients: [],
  constructorItems: {
    bun: undefined,
    ingredients: []
  }
};

export const getIngredients = createAsyncThunk(
  'ingredients/getAll',
  async () => await getIngredientsApi()
);

const ingredientsSlice = createSlice({
  name: 'burgerIngredients',
  initialState,
  reducers: {
    addIngredient: (
      state: IIngredientsState,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      if (action.payload.type === 'bun') {
        state.constructorItems.bun = action.payload;
      } else {
        state.constructorItems.ingredients.push({
          ...action.payload,
          id: String(Math.random())
        });
      }
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.constructorItems.ingredients =
        state.constructorItems.ingredients.filter(
          (item) => item.id !== action.payload
        );
    }
  },
  selectors: {
    selectIsIngredientsLoading: (state: IIngredientsState) => state.isLoading,
    selectIngredients: (state: IIngredientsState) => state.ingredients,
    selectIngredientData: (state: IIngredientsState, id: string) =>
      state.ingredients.find((item) => item._id === id),
    selectConstructorItems: (state: IIngredientsState) => state.constructorItems
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
  selectIsIngredientsLoading,
  selectIngredients,
  selectIngredientData,
  selectConstructorItems
} = ingredientsSlice.selectors;
export const { addIngredient, removeIngredient } = ingredientsSlice.actions;
export default ingredientsSlice.reducer;
