import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSlice
} from '@reduxjs/toolkit';
import { getOrderByNumberApi, getOrdersApi, orderBurgerApi } from '@api';
import { RootState } from '../../store';
import { TOrderState } from './type';

export const initialState: TOrderState = {
  orderRequest: false,
  error: null,
  name: '',
  orderData: null,
  orders: []
};

export const orderBurger = createAsyncThunk(
  'order/getOrderBurger',
  async (data: string[]) => await orderBurgerApi(data)
);

export const getOrders = createAsyncThunk('orders/getOrders', getOrdersApi);

export const getOrderByNumber = createAsyncThunk(
  'order/getOrder',
  async (number: number) => await getOrderByNumberApi(number)
);

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
  selectors: {
    selectOrderRequest: (state) => state.orderRequest,
    selectOrders: (state) => state.orders,
    selectOrderData: (state) => state.orderData
  },
  extraReducers: (builder: ActionReducerMapBuilder<TOrderState>) => {
    builder
      .addCase(orderBurger.pending, (state) => {
        state.orderRequest = true;
        state.error = null;
      })
      .addCase(orderBurger.rejected, (state, { error }) => {
        state.orderRequest = false;
        state.error = error.message;
      })
      .addCase(orderBurger.fulfilled, (state, { payload }) => {
        state.name = payload.name;
        state.orderData = payload.order;
        state.orderRequest = false;
      })
      .addCase(getOrders.pending, (state) => {
        state.error = null;
      })
      .addCase(getOrders.rejected, (state, { error }) => {
        state.error = error.message;
      })
      .addCase(getOrders.fulfilled, (state, { payload }) => {
        state.orders = payload;
      })
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
  }
});

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
