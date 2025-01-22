import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { TConstructorState } from './type';

const initialState: TConstructorState = {
  bun: null,
  ingredients: []
};

const constructorSlice = createSlice({
  name: 'burger',
  initialState,
  reducers: {
    addIngredient: (
      state: TConstructorState,
      { payload }: PayloadAction<TConstructorIngredient>
    ) => {
      if (payload.type === 'bun') {
        state.bun = payload;
      } else {
        state.ingredients.push(payload);
      }
    },
    removeIngredient: (state, { payload }: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter(
        (item) => item.id !== payload
      );
    },
    reorderIngredients: (
      state,
      { payload }: PayloadAction<{ from: number; to: number }>
    ) => {
      const { from, to } = payload;
      const ingredients = [...state.ingredients];
      ingredients.splice(to, 0, ingredients.splice(from, 1)[0]);
      state.ingredients = ingredients;
    },
    clearConstructorData: () => initialState
  },
  selectors: {
    selectConstructorItems: (state: TConstructorState) => state
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
