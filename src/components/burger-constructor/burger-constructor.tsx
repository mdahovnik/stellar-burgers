import { FC, useEffect, useMemo } from 'react';
import { TIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { RootState, useDispatch, useSelector } from '../../services/store';
import {
  clearConstructorData,
  selectConstructorItems
} from '../../services/slices/constructorSlice';
import {
  orderBurger,
  selectOrderData,
  selectOrderRequest,
  clearOrderModalData
} from '../../services/slices/orderSlice';
import { useNavigate, useParams } from 'react-router-dom';
import {
  selectIsAuthChecked,
  selectIsAuthenticated
} from '../../services/slices/userSlice';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const constructorItems = useSelector(selectConstructorItems);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const navigate = useNavigate();

  const data = () => {
    if (!constructorItems.bun) return [''];
    return [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((item) => item._id),
      constructorItems.bun._id
    ];
  };

  const orderRequest = useSelector(selectOrderRequest);
  const orderModalData = useSelector(selectOrderData);

  //TODO: кнопка оформить заказ
  const onOrderClick = () => {
    if (!isAuthenticated) {
      navigate('/profile');
      return;
    }
    if (!constructorItems.bun || orderRequest) return;
    dispatch(orderBurger(data()));
  };

  const closeOrderModal = () => {
    dispatch(clearOrderModalData());
    dispatch(clearConstructorData());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
