import {
  clearOrderData,
  clearOrders,
  getOrderByNumber,
  getOrders,
  orderBurger,
  selectGetOrderData
} from './orderSlice';
import orderBurgerReducer from './orderSlice';
import { TOrderState } from './type';
import store, { RootState } from '../../store';

describe('orderSlice test', () => {
  const initialState: TOrderState = {
    orderRequest: false,
    error: null,
    name: '',
    orderData: null,
    orders: []
  };

  const testOrder_1 = {
    _id: '111',
    status: 'pending',
    name: 'order_1',
    createdAt: '2025-01-10',
    updatedAt: '2025-01-17',
    number: 1,
    ingredients: ['ingredient_1', 'ingredient2']
  };

  const testOrder_2 = {
    _id: '222',
    status: 'pending',
    name: 'order_2',
    createdAt: '2025-01-19',
    updatedAt: '2025-01-19',
    number: 2,
    ingredients: ['ingredient_1', 'ingredient2']
  };

  const testOrder_3 = {
    _id: '333',
    status: 'pending',
    name: 'order_3',
    createdAt: '2025-01-19',
    updatedAt: '2025-01-19',
    number: 3,
    ingredients: ['ingredient_1', 'ingredient2']
  };

  const error = new Error('test error');

  it('should clear orderData', () => {
    const actualState = {
      ...initialState,
      orderData: testOrder_1
    };

    const newState = orderBurgerReducer(actualState, clearOrderData());
    expect(newState).toEqual(initialState);
  });

  it('should clear orders', () => {
    const actualState = {
      ...initialState,
      orders: [testOrder_1, testOrder_2]
    };

    const newState = orderBurgerReducer(actualState, clearOrders());
    expect(newState).toEqual(initialState);
  });

  describe('orderBurger thunk test', () => {
    it('should handle pending action', () => {
      const newState = orderBurgerReducer(
        initialState,
        orderBurger.pending('', [''])
      );
      expect(newState).toEqual({
        ...initialState,
        orderRequest: true,
        error: null
      });
    });

    it('should handle rejected action', () => {
      const actualState = {
        ...initialState,
        orderRequest: true
      };

      const newState = orderBurgerReducer(
        actualState,
        orderBurger.rejected(error, '', [''])
      );
      expect(newState).toEqual({
        ...initialState,
        orderRequest: false,
        error: error.message
      });
    });

    it('should handle fulfilled action', () => {
      const orderBurgerResponse = {
        success: true,
        order: testOrder_1,
        name: 'Burger'
      };

      const actualState = {
        ...initialState,
        orderRequest: true,
        error: null
      };

      const newState = orderBurgerReducer(
        actualState,
        orderBurger.fulfilled(orderBurgerResponse, '', [''])
      );

      expect(newState).toEqual({
        orderRequest: false,
        error: null,
        name: 'Burger',
        orderData: testOrder_1,
        orders: []
      });
    });
  });

  describe('getOrders thunk test', () => {
    it('should handle pending action', () => {
      const newState = orderBurgerReducer(initialState, getOrders.pending(''));
      expect(newState).toEqual(initialState);
    });

    it('should handle rejected action', () => {
      const newState = orderBurgerReducer(
        initialState,
        getOrders.rejected(error, '')
      );
      expect(newState).toEqual({
        ...initialState,
        error: error.message
      });
    });

    it('should handle fulfilled action', () => {
      const orderResponse = [testOrder_1];
      const newState = orderBurgerReducer(
        initialState,
        getOrders.fulfilled(orderResponse, '')
      );

      expect(newState.orders).toHaveLength(1);
      expect(newState).toEqual({
        orderRequest: false,
        error: null,
        name: '',
        orderData: null,
        orders: [testOrder_1]
      });
    });
  });

  describe('getOrderByNumber thunk test', () => {
    const number = 1;
    it('should handle pending action', () => {
      const newState = orderBurgerReducer(
        initialState,
        getOrderByNumber.pending('', number)
      );

      expect(newState.orderRequest).toBe(true);
      expect(newState.error).toBe(null);
    });

    it('should handle rejected action', () => {
      const newState = orderBurgerReducer(
        initialState,
        getOrderByNumber.rejected(error, '', number)
      );
      expect(newState).toEqual({
        ...initialState,
        error: error.message
      });
    });

    it('should handle fulfilled action', () => {
      const orders = [testOrder_1, testOrder_2];
      const orderResponse = {
        success: true,
        orders: [testOrder_1]
      };
      const newState = orderBurgerReducer(
        initialState,
        getOrderByNumber.fulfilled(orderResponse, '', number)
      );

      expect(newState.orderData?.number).toBe(number);
      expect(newState).toEqual({
        orderRequest: false,
        error: null,
        name: '',
        orderData: orders[0],
        orders: []
      });
    });
  });

  describe('selectGetOrderData test', () => {
    const state: RootState = store.getState();

    it('should return order from order.orders', () => {
      const order = {
        orders: [testOrder_1, testOrder_2, testOrder_3],
        orderData: null,
        orderRequest: false,
        error: undefined,
        name: ''
      };
      const result = selectGetOrderData('1')({ ...state, order });
      expect(result).toEqual(testOrder_1);
    });

    it('should return order from feed.orders', () => {
      const feed = {
        orders: [testOrder_1, testOrder_2],
        isLoading: false,
        error: undefined,
        total: 0,
        totalToday: 0
      };

      const result = selectGetOrderData('2')({ ...state, feed });
      expect(result).toEqual(testOrder_2);
    });

    it('should return order data from order.orderData', () => {
      const order = {
        orders: [],
        orderData: testOrder_3,
        orderRequest: false,
        error: undefined,
        name: ''
      };
      const result = selectGetOrderData('3')({ ...state, order });
      expect(result).toEqual(testOrder_3);
    });

    it('should return null if order is not found', () => {
      const result = selectGetOrderData('6')(state);
      expect(result).toBeNull();
    });
  });
});
