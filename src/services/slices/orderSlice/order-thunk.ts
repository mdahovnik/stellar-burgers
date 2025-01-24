import { createAsyncThunk } from '@reduxjs/toolkit';
import { getOrderByNumberApi, getOrdersApi, orderBurgerApi } from '@api';

export const orderBurger = createAsyncThunk(
  'order/getOrderBurger',
  async (data: string[]) => await orderBurgerApi(data)
);

export const getOrders = createAsyncThunk('orders/getOrders', getOrdersApi);

export const getOrderByNumber = createAsyncThunk(
  'order/getOrder',
  async (number: number) => await getOrderByNumberApi(number)
);
