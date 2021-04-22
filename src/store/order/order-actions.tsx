import { FirebaseAPIs } from '../../global/constants';
import CartItem from '../../models/cart-item';
import Order from '../../models/order';
import IAppState from '../i-app-state';

export enum OrderActionEnum {
  ADD_ORDER = 'ADD_ORDER',
  SET_ORDERS = 'SET_ORDERS'
}

export default class OrderActions {
  public fetchOrders = () => {
    return async (dispatch: any, getState: () => IAppState) => {
      const userId = getState().auth.userId;
      try {
        const response = await fetch(`${FirebaseAPIs.REALTIME_DATABASE}/orders/${userId}.json`, {
          method: 'GET'
        });

        if (!response.ok) {
          throw new Error('Algo deu errado!');
        }

        // responseData
        const resData = await response.json();
        const loadedOrders = [];

        for (const key in resData) {
          loadedOrders.push(
            new Order(
              key,
              resData[key].cartItems,
              resData[key].totalAmount,
              new Date(resData[key].date)
            )
          );
        }
        dispatch({ type: OrderActionEnum.SET_ORDERS, orders: loadedOrders });
      } catch (err) {
        throw err;
      }
    };
  };

  public addOrder = (cartItems: CartItem[], totalAmount: number) => {
    return async (dispatch: any, getState: () => IAppState) => {
      const token = getState().auth.token;
      const userId = getState().auth.userId;
      const date = new Date();

      const response = await fetch(
        `${FirebaseAPIs.REALTIME_DATABASE}/orders/${userId}.json?auth=${token}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            cartItems,
            totalAmount,
            date: date.toISOString()
          })
        }
      );

      if (!response.ok) {
        throw new Error('Algo deu errado!');
      }

      // responseData
      const resData = await response.json();

      dispatch({
        type: OrderActionEnum.ADD_ORDER,
        orderData: { id: resData.name, items: cartItems, amount: totalAmount, date: date }
      });
    };
  };
}
