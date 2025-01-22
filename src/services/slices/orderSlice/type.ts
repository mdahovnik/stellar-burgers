import { TOrder } from '@utils-types';

export type TOrderState = {
  orderRequest: boolean;
  error: string | undefined | null;
  name: string;
  orderData: TOrder | null;
  orders: TOrder[];
};
