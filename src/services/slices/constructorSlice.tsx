import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { IIngredientsState, initialState } from './ingredientsSlice';

// export interface IConstructorState {
//   constructorItems: {
//     bun: TIngredient | undefined;
//     ingredients: TIngredient[];
//   };
// }

const constructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState: { ...initialState.constructorItems },
  reducers: {
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter(
        (item) => item._id !== action.payload
      );
    }
  },
  selectors: {
    selectConstructorItems: (state) => state.ingredients
  }
});

export const { selectConstructorItems } = constructorSlice.selectors;
export const { removeIngredient } = constructorSlice.actions;
export default constructorSlice.reducer;
