import PRODUCTS from '../../data/dummy-data';
import Product from '../../models/product';
import { ProductActionEnum } from './product-actions';
import { IProductAction, IProductState } from './product-interfaces';

const initialState: IProductState = {
  availableProducts: PRODUCTS,
  userProducts: []
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state: IProductState = initialState, action: IProductAction): IProductState => {
  switch (action.type) {
    case ProductActionEnum.SET_PRODUCTS:
      return {
        availableProducts: state.availableProducts.concat(action.products),
        userProducts: action.userProducts
      };
    case ProductActionEnum.CREATE_PRODUCT:
      const newProduct = new Product(
        action.productData.id,
        action.productData.userId,
        action.productData.title,
        action.productData.imageUrl,
        action.productData.description,
        action.productData.price
      );
      return {
        ...state,
        availableProducts: state.availableProducts.concat(newProduct),
        userProducts: state.userProducts.concat(newProduct)
      };
    case ProductActionEnum.UPDATE_PRODUCT:
      const userProductIndex = state.userProducts.findIndex(
        (product) => product.id === action.productId
      );
      const updatedProduct = new Product(
        action.productId,
        state.userProducts[userProductIndex].userId,
        action.productData.title,
        action.productData.imageUrl,
        action.productData.description,
        state.userProducts[userProductIndex].price
      );

      const updatedUserProducts = [...state.userProducts];
      updatedUserProducts[userProductIndex] = updatedProduct;

      const availableProductIndex = state.availableProducts.findIndex(
        (product) => product.id === action.productId
      );
      const updatedAvailableProducts = [...state.availableProducts];
      updatedAvailableProducts[availableProductIndex] = updatedProduct;

      return {
        ...state,
        availableProducts: updatedAvailableProducts,
        userProducts: updatedUserProducts
      };
    case ProductActionEnum.DELETE_PRODUCT:
      return {
        ...state,
        userProducts: state.userProducts.filter((product) => product.id !== action.productId),
        availableProducts: state.availableProducts.filter(
          (product) => product.id !== action.productId
        )
      };
  }
  return state;
};
