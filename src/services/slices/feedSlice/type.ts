import { TOrder, TOrdersData } from '@utils-types';

export type TFeedState = {
  isLoading: boolean;
  error: string | null | undefined;
  orders: TOrder[];
  total: number;
  totalToday: number;
};
