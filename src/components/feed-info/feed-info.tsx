import { FC } from 'react';

import { TOrder } from '@utils-types';
import { FeedInfoUI } from '@ui';
import { useSelector } from '../../services/store/store';
import { selectFeed } from '../../services/store/selectors';

const getOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo: FC = () => {
  const feed = useSelector(selectFeed);

  const orders: TOrder[] = feed.orders;

  const readyOrders = getOrders(orders, 'done');

  const pendingOrders = getOrders(orders, 'pending');

  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={feed}
    />
  );
};
