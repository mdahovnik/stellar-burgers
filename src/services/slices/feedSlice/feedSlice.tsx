import { getFeedsApi } from '@api';
import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit';
import { TOrdersData } from '@utils-types';
import { TFeedState } from './type';

const initialState: TFeedState = {
  isLoading: false,
  error: null,
  orders: [],
  total: 0,
  totalToday: 0
};

export const getFeed = createAsyncThunk('feed/getFeed', getFeedsApi);

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    clearFeed: () => initialState
  },
  selectors: {
    selectFeed: (state: TFeedState) => state,
    selectOrder: (state: TFeedState, number: string) =>
      state.orders.find((item) => item.number.toString() === number)
  },
  extraReducers: (builder: ActionReducerMapBuilder<TFeedState>) => {
    builder
      .addCase(getFeed.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getFeed.rejected, (state, { error }) => {
        state.isLoading = false;
        state.error = error.message;
      })
      .addCase(
        getFeed.fulfilled,
        (state, { payload }: PayloadAction<TOrdersData>) => {
          state.orders = payload.orders;
          state.total = payload.total;
          state.totalToday = payload.totalToday;
          state.isLoading = false;
          state.error = null;
        }
      );
  }
});
export const { selectFeed } = feedSlice.selectors;
export const { clearFeed } = feedSlice.actions;
export default feedSlice.reducer;
