import { TIngredient } from '@utils-types';

export type TIngredientsState = {
  isLoading: boolean;
  error: string | null | undefined;
  ingredients: TIngredient[];
};
