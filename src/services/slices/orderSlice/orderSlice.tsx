import { ActionReducerMapBuilder, createSlice } from '@reduxjs/toolkit';
import { TOrderState } from './type';
import { getOrderByNumber, getOrders, orderBurger } from './order-thunk';

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
      .addCase(orderBurger.pending, (state) => {
        state.orderRequest = true;
        state.error = null;
      })
      .addCase(orderBurger.rejected, (state, { error }) => {
        state.orderRequest = false;
        state.error = error.message || 'Failed to place order';
      })
      .addCase(orderBurger.fulfilled, (state, { payload }) => {
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
        state.error = error.message || 'Failed to fetch orders';
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
        state.error = error.message || 'Failed to fetch order by number';
      })
      .addCase(getOrderByNumber.fulfilled, (state, { payload }) => {
        state.orderData = payload.orders[0];
        state.orderRequest = false;
      });
  }
});

export const { clearOrderData, clearOrders } = orderSlice.actions;
export default orderSlice.reducer;
