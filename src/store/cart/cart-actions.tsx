import Product from '../../models/product';

export enum CartActionEnum {
  ADD_TO_CART = 'ADD_TO_CART',
  REMOVE_FROM_CART = 'REMOVE_FROM_CART'
}

export default class CartActions {
  public addToCart = (product: Product) => {
    return { type: CartActionEnum.ADD_TO_CART, product: product };
  };

  public removeFromCart = (productId: string) => {
    return { type: CartActionEnum.REMOVE_FROM_CART, productId: productId };
  };
}
