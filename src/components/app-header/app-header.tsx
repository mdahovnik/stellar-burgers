import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '../../services/store/store';
import { selectUser } from '../../services/store/selectors';

export const AppHeader: FC = () => {
  const userName = useSelector(selectUser);
  return <AppHeaderUI userName={userName?.name} />;
};
