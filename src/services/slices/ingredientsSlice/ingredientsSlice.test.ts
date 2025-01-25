import ingredientsReducer, { initialState } from './ingredientsSlice';
import { getIngredients } from './ingredients-thunk';

describe('ingredientSlice test', () => {
  test('should handle when pending is dispatched', () => {
    const state = ingredientsReducer(initialState, getIngredients.pending(''));

    expect(state.isLoading).toBe(true);
    expect(state.error).toBe(null);
    expect(state.ingredients).toEqual([]);
  });

  test('should handle when fulfilled is dispatched', () => {
    const ingredient = {
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

    const newState = ingredientsReducer(
      initialState,
      getIngredients.fulfilled([ingredient], '')
    );

    expect(newState).toEqual({
      isLoading: false,
      error: null,
      ingredients: [ingredient]
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
});
