import Product from '../../models/product';

export interface ICartState {
  items: any;
  totalQuantity: number;
  totalAmount: number;
}

export interface ICartAction {
  type: string;
  productId: string;
  product: Product;
}
