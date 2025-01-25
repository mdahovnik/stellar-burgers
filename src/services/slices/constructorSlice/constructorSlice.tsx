import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient } from '@utils-types';
import { TConstructorState } from './type';
import { RootState } from '../../store';

export const initialState: TConstructorState = {
  bun: null,
  ingredients: []
};

const constructorSlice = createSlice({
  name: 'burger',
  initialState,
  reducers: {
    addIngredient: (
      state,
      { payload }: PayloadAction<TConstructorIngredient>
    ) => {
      payload.type === 'bun'
        ? (state.bun = payload)
        : state.ingredients.push(payload);
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
      const [movedItem] = state.ingredients.splice(from, 1);
      state.ingredients.splice(to, 0, movedItem);
    },
    clearConstructorData: (state) => {
      state.bun = null;
      state.ingredients = [];
    }
  }
});

export const selectConstructorItems = ({ burger }: RootState) => burger;

export const {
  addIngredient,
  removeIngredient,
  reorderIngredients,
  clearConstructorData
} = constructorSlice.actions;
export default constructorSlice.reducer;
