import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSlice
} from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getOrderByNumberApi, getOrdersApi, orderBurgerApi } from '@api';
import { RootState } from '../store';

export interface IOrderState {
  orderRequest: boolean;
  error: string | undefined | null;
  name: string;
  orderData: TOrder | null;
  orders: TOrder[];
}

const initialState: IOrderState = {
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
  extraReducers: (builder: ActionReducerMapBuilder<IOrderState>) => {
    builder
      .addCase(orderBurger.pending, (state) => {
        state.orderRequest = true;
        state.error = null;
      })
      .addCase(orderBurger.rejected, (state: IOrderState, action) => {
        state.orderRequest = false;
        state.error = action.error.message;
      })
      .addCase(orderBurger.fulfilled, (state, action) => {
        state.name = action.payload.name;
        state.orderData = action.payload.order;
        state.orderRequest = false;
      })
      .addCase(getOrders.pending, (state) => {
        state.error = null;
      })
      .addCase(getOrders.rejected, (state: IOrderState, action) => {
        state.error = action.error.message;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
      })
      .addCase(getOrderByNumber.pending, (state) => {
        state.orderRequest = true;
        state.error = null;
      })
      .addCase(getOrderByNumber.rejected, (state: IOrderState, action) => {
        state.orderRequest = false;
        state.error = action.error.message;
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.orderData = action.payload.orders[0];
        state.orderRequest = false;
      });
  }
});

export const selectGetOrderData = (number: string) => (state: RootState) => {
  if (state.order.orders.length) {
    const data = state.order.orders.find(
      (item) => item.number === Number(number)
    );
    if (data) return data;
  }

  if (state.feed.data.orders.length) {
    const data = state.feed.data.orders.find(
      (item) => item.number === Number(number)
    );
    if (data) return data;
  }

  if (state.order.orderData?.number === Number(number)) {
    return state.order.orderData;
  }

  return null;
};

export const { selectOrderRequest, selectOrders, selectOrderData } =
  orderSlice.selectors;
export const { clearOrderData, clearOrders } = orderSlice.actions;
export default orderSlice.reducer;
