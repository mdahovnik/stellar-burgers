import { ActionReducerMapBuilder, createSlice } from '@reduxjs/toolkit';
import { TOrderState } from './type';
import { getOrderByNumber, getOrders, placeOrder } from './order-thunk';
import { RootState } from '../../store/store';

export const initialState: TOrderState = {
  orderRequest: false,
  error: null,
  name: '',
  orderData: null,
  orders: []
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrderData(state) {
      state.orderData = null;
    },
    clearOrders(state) {
      state.orders = [];
    }
  },
  extraReducers: (builder: ActionReducerMapBuilder<TOrderState>) => {
    // Creating a new order
    builder
      .addCase(placeOrder.pending, (state) => {
        state.orderRequest = true;
        state.error = null;
      })
      .addCase(placeOrder.rejected, (state, { error }) => {
        state.orderRequest = false;
        state.error = error.message;
      })
      .addCase(placeOrder.fulfilled, (state, { payload }) => {
        state.name = payload.name;
        state.orderData = payload.order;
        state.orderRequest = false;
      });

    // Fetching multiple orders
    builder
      .addCase(getOrders.pending, (state) => {
        state.error = null;
      })
      .addCase(getOrders.rejected, (state, { error }) => {
        state.error = error.message;
      })
      .addCase(getOrders.fulfilled, (state, { payload }) => {
        state.orders = payload;
      });

    // Fetching an order by number
    builder
      .addCase(getOrderByNumber.pending, (state) => {
        state.orderRequest = true;
        state.error = null;
      })
      .addCase(getOrderByNumber.rejected, (state, { error }) => {
        state.orderRequest = false;
        state.error = error.message;
      })
      .addCase(getOrderByNumber.fulfilled, (state, { payload }) => {
        state.orderData = payload.orders[0];
        state.orderRequest = false;
      });
  },
  selectors: {
    selectOrderRequest: (state) => state.orderRequest,
    selectOrders: (state) => state.orders,
    selectOrderData: (state) => state.orderData
  }
});

/**
 * Select a specific order by its number from the store.
 * @param number - The order number to search for.
 */
export const selectGetOrderData =
  (number: string) =>
  ({ order, feed }: RootState) => {
    if (order.orders.length) {
      const data = order.orders.find((item) => item.number === Number(number));
      if (data) return data;
    }

    if (feed.orders.length) {
      const data = feed.orders.find((item) => item.number === Number(number));
      if (data) return data;
    }

    if (order.orderData?.number === Number(number)) {
      return order.orderData;
    }

    return null;
  };

export const { selectOrderRequest, selectOrders, selectOrderData } =
  orderSlice.selectors;
export const { clearOrderData, clearOrders } = orderSlice.actions;
export default orderSlice.reducer;
