import { TConstructorIngredient } from '@utils-types';
import { TConstructorState } from './type';
import constructorReducer, {
  addIngredient,
  clearConstructorData,
  removeIngredient,
  reorderIngredients
} from './constructorSlice';

describe('constructorSlice testing', () => {
  const ingredient_1: TConstructorIngredient = {
    _id: '01234',
    id: '01234',
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

  const ingredient_2: TConstructorIngredient = {
    _id: '123',
    id: '123',
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

  const bun: TConstructorIngredient = {
    _id: '98765',
    id: '98765',
    name: 'Brioche bun',
    type: 'bun',
    proteins: 1,
    fat: 0.5,
    carbohydrates: 3.8,
    calories: 15,
    price: 10,
    image: 'tomato.jpg',
    image_large: 'tomato_large.jpg',
    image_mobile: 'tomato_mobile.jpg'
  };

  test('should handle add ingredient', () => {
    const initialState: TConstructorState = { bun: null, ingredients: [] };
    const newState = constructorReducer(
      initialState,
      addIngredient(ingredient_1)
    );

    expect(newState.ingredients).toHaveLength(1);
    expect(newState.ingredients[0]).toEqual({
      ...ingredient_1,
      id: expect.any(String)
    });
  });

  test('should handle add bun', () => {
    const initialState: TConstructorState = { bun: null, ingredients: [] };
    const newState = constructorReducer(initialState, addIngredient(bun));

    expect(newState.bun).toEqual({
      ...bun,
      id: expect.any(String)
    });
    expect(newState.ingredients).toHaveLength(0);
  });

  test('should handle remove ingredient', () => {
    const initialState: TConstructorState = {
      bun: null,
      ingredients: [ingredient_1]
    };
    const newState = constructorReducer(
      initialState,
      removeIngredient(ingredient_1._id)
    );

    expect(newState.ingredients).toHaveLength(0);
  });

  test('should handle reorder ingredients', () => {
    const initialState: TConstructorState = {
      bun: null,
      ingredients: [ingredient_1, ingredient_2]
    };
    const newState = constructorReducer(
      initialState,
      reorderIngredients({ from: 1, to: 0 })
    );

    expect(newState).toEqual({
      bun: null,
      ingredients: [ingredient_2, ingredient_1]
    });
  });

  test('should handle clear constructor', () => {
    const initialState: TConstructorState = {
      bun: bun,
      ingredients: [ingredient_1, ingredient_2]
    };
    const newState = constructorReducer(initialState, clearConstructorData());

    expect(newState).toEqual({ bun: null, ingredients: [] });
  });
});
