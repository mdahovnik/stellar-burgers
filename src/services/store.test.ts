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
  it('should combine the states of reducers', () => {
    const action = { type: 'UNKNOWN_ACTION' };
    const state = rootReducer(initialState, action);
    expect(state).toEqual(initialState);
  });

  it('should initialize the initialState correctl', () => {
    const state = store.getState();
    expect(state).toEqual(initialState);
  });
});
q
