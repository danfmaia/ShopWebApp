import Product from '../../models/product';

export interface IProductState {
  availableProducts: Product[];
  userProducts: Product[];
}

export interface IProductAction {
  type: string;
  products: Product[];
  userProducts: Product[];
  productId: string;
  productData: Product;
}
