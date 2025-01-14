export enum EP {
  ANY = '*',
  HOME = '/',
  FEED = 'feed',
  FEED_NUMBER = 'feed/:number',
  PROFILE = 'profile',
  ORDERS = 'orders',
  PROFILE_ORDERS_NUMBER = 'profile/orders/:number',
  INGREDIENTS_ID = 'ingredients/:id',
  LOGIN = 'login',
  REGISTER = 'register',
  FORGOT_PASSWORD = 'forgot-password',
  RESET_PASSWORD = 'reset-password'
}
