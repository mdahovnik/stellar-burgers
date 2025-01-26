import feedReducer, { clearFeed, initialState } from './feedSlice';
import { TOrder } from '@utils-types';
import { getFeed } from './feed-thunk';

describe('feedSlice testing', () => {
  test('should handle when pending is dispatched', () => {
    const newState = feedReducer(initialState, getFeed.pending(''));

    expect(newState).toEqual({
      isLoading: true,
      error: null,
      orders: [],
      total: 0,
      totalToday: 0
    });
  });

  test('should handle when rejected is dispatched', () => {
    const error = new Error('test error');
    const newState = feedReducer(initialState, getFeed.rejected(error, ''));

    expect(newState).toEqual({
      isLoading: false,
      error: error.message,
      orders: [],
      total: 0,
      totalToday: 0
    });
  });

  test('should handle when fulfilled is dispatched', () => {
    const orders: TOrder[] = [
      {
        _id: '12345',
        status: 'pending',
        name: 'order_1',
        createdAt: '2025-01-19',
        updatedAt: '2025-01-19',
        number: 1,
        ingredients: ['ingredient_1', 'ingredient2']
      }
    ];
    const total = 1;
    const totalToday = 1;

    const feedResponse = {
      success: true,
      orders,
      total,
      totalToday
    };

    const newState = feedReducer(
      initialState,
      getFeed.fulfilled(feedResponse, '')
    );

    expect(newState).toEqual({
      isLoading: false,
      error: null,
      orders: orders,
      total: total,
      totalToday: totalToday
    });
  });

  test('should handle clear feed', () => {
    const state = {
      isLoading: false,
      error: null,
      orders: [
        {
          _id: '12345',
          status: 'pending',
          name: 'order_1',
          createdAt: '2025-01-19',
          updatedAt: '2025-01-19',
          number: 1,
          ingredients: ['ingredient_1', 'ingredient2']
        }
      ],
      total: 1,
      totalToday: 1
    };
    const newState = feedReducer(state, clearFeed());

    expect(newState).toEqual(initialState);
  });
});
