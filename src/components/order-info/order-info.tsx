import { FC, useEffect, useMemo } from 'react';
import { Preloader } from '@ui';
import { OrderInfoUI } from '@ui';
import { TIngredient, TOrder } from '@utils-types';
import store, {
  RootState,
  useDispatch,
  useSelector
} from '../../services/store';
import { selectIngredients } from '../../services/slices/ingredientsSlice';
import { selectOrder } from '../../services/slices/feedSlice';
import { useParams } from 'react-router-dom';
import {
  clearOrderModalData,
  getOrderByNumber,
  getOrderDataSelector,
  selectOrderData
} from '../../services/slices/orderSlice';

export const OrderInfo: FC = () => {
  /** TODO: взять переменные orderData и ingredients из стора */
  const dispatch = useDispatch();
  const params = useParams();
  const number = params.number!;
  const ingredients: TIngredient[] = useSelector(selectIngredients); //[];

  const orderData = useSelector(getOrderDataSelector(number));

  useEffect(() => {
    if (!orderData) dispatch(getOrderByNumber(Number(number)));
  }, [orderData, number]);

  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
