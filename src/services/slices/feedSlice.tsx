import { getFeedsApi } from '@api';
import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit';
import { TOrdersData } from '@utils-types';

export interface IFeedState {
  isLoading: boolean;
  error: string | null | undefined;
  data: TOrdersData;
}

const initialState: IFeedState = {
  isLoading: false,
  error: null,
  data: {
    orders: [],
    total: 0,
    totalToday: 0
  }
};

export const getFeeds = createAsyncThunk(
  'feed/getFeeds',
  async () => await getFeedsApi()
);

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    clearFeedData(state) {
      state.data = {
        orders: [],
        total: 0,
        totalToday: 0
      };
    }
  },
  selectors: {
    selectFeed: (state: IFeedState) => state.data,
    selectOrder: (state: IFeedState, number: string) =>
      state.data.orders.find((item) => item.number.toString() === number)
  },
  extraReducers: (builder: ActionReducerMapBuilder<IFeedState>) => {
    builder
      .addCase(getFeeds.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getFeeds.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(
        getFeeds.fulfilled,
        (state, action: PayloadAction<TOrdersData>) => {
          state.data = action.payload;
          state.isLoading = false;
          state.error = null;
        }
      );
  }
});
export const { selectFeed, selectOrder } = feedSlice.selectors;
export const { clearFeedData } = feedSlice.actions;
export default feedSlice.reducer;
