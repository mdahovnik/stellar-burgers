import { FC, useMemo } from 'react';
import { TIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import { selectConstructorItems } from '../../services/slices/constructorSlice';
import { useNavigate, useParams } from 'react-router-dom';
import {
  getOrderByNumber,
  orderBurger,
  selectOrderByNumber,
  selectOrder,
  selectOrderRequest,
  clearOrderModalData
} from '../../services/slices/orderSlice';

export const BurgerConstructor: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const constructorItems = useSelector(selectConstructorItems);

  const data = () => {
    if (!constructorItems.bun) return [''];
    return [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((item) => item._id),
      constructorItems.bun._id
    ];
  };

  const orderRequest = useSelector(selectOrderRequest);
  const orderModalData = useSelector(selectOrder); //(selectOrderByNumber); //

  //TODO: кнопка оформить заказ
  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    dispatch(orderBurger(data()));
  };

  const closeOrderModal = () => {
    dispatch(clearOrderModalData());
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
