import { FC } from 'react';
import { Preloader } from '@ui';
import { IngredientDetailsUI } from '@ui';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from '../../services/store';
import {
  IIngredientsState,
  selectIngredientData
} from '../../services/slices/ingredientsSlice';

export const IngredientDetails: FC = () => {
  /** TODO: взять переменную из стора */
  const params = useParams();
  const ingredientData = useSelector((state) =>
    selectIngredientData(state, params.id!)
  );
  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
