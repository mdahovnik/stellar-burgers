import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';

export interface IConstructorState {
  burger: {
    bun: TIngredient | undefined;
    ingredients: TConstructorIngredient[];
  };
}

const initialState: IConstructorState = {
  burger: {
    bun: undefined,
    ingredients: []
  }
};

const constructorSlice = createSlice({
  name: 'constructorData',
  initialState,
  reducers: {
    addIngredient: (
      state: IConstructorState,
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
    }
  },
  selectors: {
    selectConstructorItems: (state: IConstructorState) => state.burger
  }
});

export const { selectConstructorItems } = constructorSlice.selectors;
export const { addIngredient, removeIngredient, reorderIngredients } =
  constructorSlice.actions;
export default constructorSlice.reducer;
