import ingredientsReducer, {
  initialState,
  selectIngredientsById
} from './ingredientsSlice';
import { getIngredients } from './ingredients-thunk';
import store, { RootState } from '../../store/store';
import { TIngredientsState } from './type';

describe('ingredientSlice test', () => {
  const ingredient1 = {
    _id: '01234',
    name: 'Tomato',
    type: 'vegetable',
    proteins: 1,
    fat: 0.5,
    carbohydrates: 3.8,
    calories: 15,
    price: 10,
    image: 'tomato.jpg',
    image_large: 'tomato_large.jpg',
    image_mobile: 'tomato_mobile.jpg'
  };
  const ingredient2 = {
    _id: '5678',
    name: 'Tomato',
    type: 'vegetable',
    proteins: 1,
    fat: 0.5,
    carbohydrates: 3.8,
    calories: 15,
    price: 10,
    image: 'tomato.jpg',
    image_large: 'tomato_large.jpg',
    image_mobile: 'tomato_mobile.jpg'
  };
  const ingredientsList = [ingredient1, ingredient2];

  test('should handle when pending is dispatched', () => {
    const state = ingredientsReducer(initialState, getIngredients.pending(''));

    expect(state.isLoading).toBe(true);
    expect(state.error).toBe(null);
    expect(state.ingredients).toEqual([]);
  });

  test('should handle when fulfilled is dispatched', () => {
    const newState = ingredientsReducer(
      initialState,
      getIngredients.fulfilled([ingredient1], '')
    );

    expect(newState).toEqual({
      isLoading: false,
      error: null,
      ingredients: [ingredient1]
    });
  });

  test('should handle when rejected is dispatched', () => {
    const error = new Error('test error');
    const newState = ingredientsReducer(
      initialState,
      getIngredients.rejected(error, '')
    );

    expect(newState.isLoading).toBe(false);
    expect(newState.error).toBe('test error');
    expect(newState.ingredients).toEqual([]);
  });

  it('should return ingredient by id', () => {
    const state: RootState = store.getState();
    const ingredients = {
      ...initialState,
      ingredients: ingredientsList
    };

    const ingredient = selectIngredientsById('5678')({ ...state, ingredients });
    expect(ingredient).toEqual(ingredient2);
  });
});
