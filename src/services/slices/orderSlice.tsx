import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getOrderByNumberApi, getOrdersApi, orderBurgerApi } from '@api';

export interface IOrderState {
  orderRequest: boolean;
  error: string | undefined | null;
  // success: boolean;
  name: string;
  order: TOrder;
  ordersByNumber: TOrder[]; //TODO: переименовать переменную
  orders: TOrder[];
}

const initialState: IOrderState = {
  orderRequest: false,
  error: null,
  // success: false,
  name: '',
  order: {
    _id: '',
    status: '',
    name: '',
    createdAt: '',
    updatedAt: '',
    number: 0,
    ingredients: []
  },
  ordersByNumber: [],
  orders: []
};

export const orderBurger = createAsyncThunk(
  'order/getOrderBurger',
  async (data: string[]) => await orderBurgerApi(data)
);

export const getOrders = createAsyncThunk(
  'orders/getOrders',
  async () => await getOrdersApi()
);

export const getOrderByNumber = createAsyncThunk(
  'order/getOrderByNumber',
  async (number: number) => await getOrderByNumberApi(number)
);

//TODO: почистить
const orderSlice = createSlice({
  name: 'orderData',
  initialState,
  reducers: {
    clearOrderByNumber(state) {
      state.ordersByNumber = [];
    },
    clearOrderModalData(state) {
      state.order = {
        _id: '',
        status: '',
        name: '',
        createdAt: '',
        updatedAt: '',
        number: 0,
        ingredients: []
      };
    }
  },
  selectors: {
    selectOrder: (state) => state.order,
    selectOrderRequest: (state) => state.orderRequest,
    selectOrders: (state) => state.orders,
    selectOrderByNumber: (state) => state.ordersByNumber
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
        state.order = action.payload.order;
        // state.success = action.payload.success;
        state.name = action.payload.name;
        state.orderRequest = false;
      })
      .addCase(getOrders.pending, (state) => {
        // state.orderRequest = true;
        state.error = null;
      })
      .addCase(getOrders.rejected, (state: IOrderState, action) => {
        // state.orderRequest = false;
        state.error = action.error.message;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        // state.orderRequest = false;
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
        state.ordersByNumber = action.payload.orders;
        state.orderRequest = false;
        // state.success = action.payload.;
      });
  }
});

export const {
  selectOrder,
  selectOrderRequest,
  selectOrders,
  selectOrderByNumber
} = orderSlice.selectors;
export const { clearOrderByNumber, clearOrderModalData } = orderSlice.actions;
export default orderSlice.reducer;
