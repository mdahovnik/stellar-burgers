import { FC, useMemo } from 'react';
import { TIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store/store';
import {
  clearConstructorData,
  selectConstructorItems
} from '../../services/slices/constructorSlice/constructorSlice';
import { useNavigate } from 'react-router-dom';
import { placeOrder } from '../../services/slices/orderSlice/order-thunk';
import {
  clearOrderData,
  selectOrderData,
  selectOrderRequest
} from '../../services/slices/orderSlice/orderSlice';
import { selectIsAuthenticated } from '../../services/slices/userSlice/userSlice';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const constructorItems = useSelector(selectConstructorItems);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const navigate = useNavigate();

  const orderData = () => {
    if (!constructorItems.bun) return [''];
    return [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((item) => item._id),
      constructorItems.bun._id
    ];
  };

  const orderRequest = useSelector(selectOrderRequest);
  const orderModalData = useSelector(selectOrderData);

  const onOrderClick = () => {
    if (!isAuthenticated) {
      navigate('/login', { replace: true });
      return;
    }
    if (!constructorItems.bun || orderRequest) return;
    dispatch(placeOrder(orderData()));
  };

  const closeOrderModal = () => {
    dispatch(clearOrderData());
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
