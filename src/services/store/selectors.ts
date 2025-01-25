import { RootState } from './store';

// User selectors
export const selectIsAuthChecked = ({ user }: RootState) => user.isAuthChecked;
export const selectIsAuthenticated = ({ user }: RootState) =>
  user.isAuthenticated;
export const selectUser = ({ user }: RootState) => user.user;
export const selectIsLoading = ({ user }: RootState) => user.isLoading;
export const selectUserLoginError = ({ user }: RootState) => user.error;

// Order selectors
/**
 * Select a specific order by its number from the store.
 * @param number - The order number to search for.
 */
export const selectGetOrderData =
  (number: string) =>
  ({ order, feed }: RootState) => {
    if (order.orders.length) {
      const data = order.orders.find((item) => item.number === Number(number));
      if (data) return data;
    }

    const orderData = order.orders.find(
      (item) => item.number === Number(number)
    );
    if (orderData) return orderData;

    if (feed.orders.length) {
      const data = feed.orders.find((item) => item.number === Number(number));
      if (data) return data;
    }

    if (order.orderData?.number === Number(number)) {
      return order.orderData;
    }

    return null;
  };
export const selectOrderRequest = ({ order }: RootState) => order.orderRequest;
export const selectOrders = ({ order }: RootState) => order.orders;
export const selectOrderData = ({ order }: RootState) => order.orderData;

// Feed selectors
export const selectFeed = ({ feed }: RootState) => feed;

// Ingredients selectors
export const selectIsIngredientsLoading = ({ ingredients }: RootState) =>
  ingredients.isLoading;
export const selectIngredients = ({ ingredients }: RootState) =>
  ingredients.ingredients;
export const selectIngredientsById = (id: string) => (state: RootState) =>
  state.ingredients.ingredients.find((item) => item._id === id);

// Constructor selectors
export const selectConstructorItems = ({ burger }: RootState) => burger;
