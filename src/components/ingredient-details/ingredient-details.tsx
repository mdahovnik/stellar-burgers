import { FC, useEffect } from 'react';
import { Preloader } from '@ui';
import { IngredientDetailsUI } from '@ui';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import {
  clearIngredientById,
  IIngredientsState,
  selectIngredientData,
  setIngredientById
} from '../../services/slices/ingredientsSlice';

export const IngredientDetails: FC = () => {
  /** TODO: взять переменную из стора */
  const params = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setIngredientById({ id: params.id! }));
    return () => {
      dispatch(clearIngredientById());
    };
  }, []);

  const ingredientData = useSelector(selectIngredientData);

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
