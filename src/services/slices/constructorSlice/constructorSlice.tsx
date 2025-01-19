import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';

export type TConstructorState = {
  burger: {
    bun: TIngredient | undefined;
    ingredients: TConstructorIngredient[];
  };
};

const initialState: TConstructorState = {
  burger: {
    bun: undefined,
    ingredients: []
  }
};

const constructorSlice = createSlice({
  name: 'burger',
  initialState,
  reducers: {
    addIngredient: (
      state: TConstructorState,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      if (action.payload.type === 'bun') {
        state.burger.bun = action.payload;
      } else {
        state.burger.ingredients.push(action.payload);
      }
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.burger.ingredients = state.burger.ingredients.filter(
        (item) => item.id !== action.payload
      );
    },
    reorderIngredients: (
      state,
      { payload }: PayloadAction<{ from: number; to: number }>
    ) => {
      const { from, to } = payload;
      const ingredients = [...state.burger.ingredients];
      ingredients.splice(to, 0, ingredients.splice(from, 1)[0]);
      state.burger.ingredients = ingredients;
    },
    clearConstructorData: (state) => {
      state.burger = {
        bun: undefined,
        ingredients: []
      };
    }
  },
  selectors: {
    selectConstructorItems: (state: TConstructorState) => state.burger
  }
});

export const { selectConstructorItems } = constructorSlice.selectors;
export const {
  addIngredient,
  removeIngredient,
  reorderIngredients,
  clearConstructorData
} = constructorSlice.actions;
export default constructorSlice.reducer;
