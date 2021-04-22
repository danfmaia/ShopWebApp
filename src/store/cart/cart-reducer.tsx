import CartItem from '../../models/cart-item';
import { OrderActionEnum } from '../order/order-actions';
import { ProductActionEnum } from '../product/product-actions';
import { CartActionEnum } from './cart-actions';
import { ICartAction, ICartState } from './cart-interfaces';

const initialState: ICartState = {
  items: {},
  totalQuantity: 0,
  totalAmount: 0
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state: ICartState = initialState, action: ICartAction): ICartState => {
  switch (action.type) {
    case CartActionEnum.ADD_TO_CART:
      const addedProduct = action.product;
      const productId = addedProduct.id;
      const productPrice = addedProduct.price;
      const productTitle = addedProduct.title;

      let newOrUpdatedCartItem;

      if (!state.items[addedProduct.id]) {
        // item not in the cart yet
        newOrUpdatedCartItem = new CartItem(productId, 1, productPrice, productTitle, productPrice);
      } else {
        // item already in the cart
        newOrUpdatedCartItem = new CartItem(
          productId,
          state.items[addedProduct.id].quantity + 1,
          productPrice,
          productTitle,
          state.items[addedProduct.id].sum + productPrice
        );
      }
      return {
        ...state,
        items: { ...state.items, [addedProduct.id]: newOrUpdatedCartItem },
        totalQuantity: state.totalQuantity + 1,
        // totalQuantity: 0,
        totalAmount: state.totalAmount + productPrice
      };
    case CartActionEnum.REMOVE_FROM_CART:
      const selectedCartItem = state.items[action.productId];
      const currentQuantity = selectedCartItem.quantity;
      let updatedCartItems;
      if (currentQuantity > 1) {
        // reduce it
        const updatedCartItem = new CartItem(
          selectedCartItem.productId,
          selectedCartItem.quantity - 1,
          selectedCartItem.productPrice,
          selectedCartItem.productTitle,
          selectedCartItem.sum - selectedCartItem.productPrice
        );
        updatedCartItems = { ...state.items, [action.productId]: updatedCartItem };
      } else {
        // erase it
        updatedCartItems = { ...state.items };
        delete updatedCartItems[action.productId];
      }
      return {
        ...state,
        items: updatedCartItems,
        totalQuantity: state.totalQuantity - 1,
        // totalQuantity: 0,
        totalAmount: state.totalAmount - selectedCartItem.productPrice
      };
    case OrderActionEnum.ADD_ORDER:
      return initialState;
    case ProductActionEnum.DELETE_PRODUCT:
      if (!state.items[action.productId]) {
        return state;
      }
      const updatedItems = { ...state.items };
      const itemTotalQuantity = state.items[action.productId].quantity;
      const itemTotalAmount = state.items[action.productId].sum;
      delete updatedItems[action.productId];
      return {
        ...state,
        items: updatedItems,
        totalQuantity: state.totalQuantity - itemTotalQuantity,
        totalAmount: state.totalAmount - itemTotalAmount
      };
  }
  return state;
};
