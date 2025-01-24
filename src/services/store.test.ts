import { initialState as ingredientReducer } from './slices/ingredientsSlice/ingredientsSlice';
import { initialState as constructorReducer } from './slices/constructorSlice/constructorSlice';
import { initialState as feedReducer } from './slices/feedSlice/feedSlice';
import { initialState as userReducer } from './slices/userSlice/userSlice';
import { initialState as orderReducer } from './slices/orderSlice/orderSlice';
import store, { rootReducer } from './store';

const initialState = {
  ingredients: ingredientReducer,
  burger: constructorReducer,
  feed: feedReducer,
  user: userReducer,
  order: orderReducer
};

describe('rootReducer test', () => {
  it('should initialize correctly', () => {
    const state = store.getState();
    expect(state).toEqual(initialState);
  });

  it('should remains unchanged after dispatching an unknownAction type', () => {
    const action = { type: 'unknownAction' };
    const state = rootReducer(initialState, action);
    expect(state).toEqual(initialState);
  });

  it('should update states ', () => {
    const action = {
      type: 'burger/addIngredient',
      payload: {
        type: 'bun',
        name: 'Bun1'
      }
    };

    const expectedState = {
      bun: { name: 'Bun1', type: 'bun' },
      ingredients: []
    };

    store.dispatch(action);
    const state = store.getState();
    expect(state.burger).toEqual(expectedState);
  });
});
