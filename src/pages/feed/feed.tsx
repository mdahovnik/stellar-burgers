import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store/store';
import { clearFeed } from '../../services/slices/feedSlice/feedSlice';
import { getFeed } from '../../services/slices/feedSlice/feed-thunk';
import { selectFeed } from '../../services/store/selectors';

export const Feed: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFeed());
    return () => {
      dispatch(clearFeed());
    };
  }, []);

  const feed = useSelector(selectFeed);
  const orders: TOrder[] = feed.orders;
  const handleGetFeeds = () => {
    dispatch(clearFeed());
    dispatch(getFeed());
  };

  if (!orders.length) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
