import { FC, useEffect, useLayoutEffect, useMemo } from 'react';
import { Preloader } from '@ui';
import { OrderInfoUI } from '@ui';
import { TIngredient, TOrder } from '@utils-types';
import { useDispatch, useSelector } from '../../services/store';
import { selectIngredients } from '../../services/slices/ingredientsSlice';
import { selectOrder } from '../../services/slices/feedSlice';
import { useParams } from 'react-router-dom';
import {
  clearOrderByNumber,
  getOrderByNumber,
  selectOrderByNumber
} from '../../services/slices/orderSlice';

export const OrderInfo: FC = () => {
  /** TODO: взять переменные orderData и ingredients из стора */
  const dispatch = useDispatch();
  const params = useParams();
  const orderByNumberData = useSelector(selectOrderByNumber);
  // const ingredientsData = useSelector(selectIngredients);

  const ingredients: TIngredient[] = useSelector(selectIngredients); //[];
  let orderData = orderByNumberData[0];

  useEffect(() => {
    dispatch(getOrderByNumber(Number(params.number!)));
    return () => {
      dispatch(clearOrderByNumber());
    };
  }, []);

  // const orderData = useSelector((state) => selectOrder(state, params.number!));

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
