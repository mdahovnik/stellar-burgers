import { FC } from 'react';
import { Preloader } from '@ui';
import { IngredientDetailsUI } from '@ui';
import { useParams } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { selectIngredientsById } from '../../services/slices/ingredientsSlice/ingredientsSlice';

export const IngredientDetails: FC = () => {
  const { id } = useParams();

  const ingredientData = useSelector(selectIngredientsById(id!));

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
