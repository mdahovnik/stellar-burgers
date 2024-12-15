import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';

export interface IConstructorState {
  constructorItems: {
    bun: TIngredient | undefined;
    ingredients: TConstructorIngredient[];
  };
}

export const initialState: IConstructorState = {
  constructorItems: {
    bun: undefined,
    ingredients: []
  }
};

const constructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: (
      state: IConstructorState,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      if (action.payload.type === 'bun') {
        state.constructorItems.bun = action.payload;
      } else {
        state.constructorItems.ingredients.push(action.payload);
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
    selectConstructorItems: (state: IConstructorState) => state.constructorItems
  }
});

export const { selectConstructorItems } = constructorSlice.selectors;
export const { addIngredient, removeIngredient } = constructorSlice.actions;
export default constructorSlice.reducer;
