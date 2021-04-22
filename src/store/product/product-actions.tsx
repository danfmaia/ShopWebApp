import { FirebaseAPIs } from '../../global/constants';
import Product from '../../models/product';
import IAppState from '../i-app-state';

export enum ProductActionEnum {
  SET_PRODUCTS = 'SET_PRODUCTS',
  CREATE_PRODUCT = 'CREATE_PRODUCT',
  UPDATE_PRODUCT = 'UPDATE_PRODUCT',
  DELETE_PRODUCT = 'DELETE_PRODUCT'
}

export default class ProductActions {
  public fetchProducts = () => {
    return async (dispatch: any, getState: () => IAppState) => {
      try {
        const userId = getState().auth.userId;

        const response = await fetch(
          `${FirebaseAPIs.REALTIME_DATABASE}/products.json`,
          {
            method: 'GET'
          }
        );

        if (!response.ok) {
          throw new Error('Algo deu errado!');
        }

        // responseData
        const resData = await response.json();
        const loadedProducts = [];

        for (const key in resData) {
          loadedProducts.push(
            new Product(
              key,
              resData[key].userId,
              resData[key].title,
              resData[key].imageUrl,
              resData[key].description,
              resData[key].price
            )
          );
        }
        dispatch({
          type: ProductActionEnum.SET_PRODUCTS,
          products: loadedProducts,
          userProducts: loadedProducts.filter((product) => product.userId === userId)
        });
      } catch (err) {
        // send to custom analytics server, for example
        throw err;
      }
    };
  };

  public createProduct = (title: string, description: string, imageUrl: string, price: string) => {
    return async (dispatch: any, getState: () => IAppState) => {
      const token = getState().auth.token;
      const userId = getState().auth.userId;

      const response = await fetch(
        `${FirebaseAPIs.REALTIME_DATABASE}/products.json?auth=${token}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            userId: userId,
            title,
            description,
            imageUrl,
            price
          })
        }
      );

      // responseData
      const resData = await response.json();

      dispatch({
        type: ProductActionEnum.CREATE_PRODUCT,
        productData: {
          id: resData.name,
          userId: userId,
          title: title,
          description: description,
          imageUrl: imageUrl,
          price: price
        }
      });
    };
  };

  public updateProduct = (id: string, title: string, description: string, imageUrl: string) => {
    return async (dispatch: any, getState: () => IAppState) => {
      const token = getState().auth.token;

      const response = await fetch(
        `${FirebaseAPIs.REALTIME_DATABASE}/products/${id}.json?auth=${token}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            title,
            description,
            imageUrl
          })
        }
      );

      if (!response.ok) {
        throw new Error('Algo deu errado!');
      }

      dispatch({
        type: ProductActionEnum.UPDATE_PRODUCT,
        productId: id,
        productData: {
          title: title,
          description: description,
          imageUrl: imageUrl
        }
      });
    };
  };

  public deleteProduct = (productId: string) => {
    return async (dispatch: any, getState: () => IAppState) => {
      const token = getState().auth.token;

      const response = await fetch(
        `${FirebaseAPIs.REALTIME_DATABASE}/products/${productId}.json?auth=${token}`,
        {
          method: 'DELETE'
        }
      );

      if (!response.ok) {
        throw new Error('Algo deu errado!');
      }

      dispatch({
        type: ProductActionEnum.DELETE_PRODUCT,
        productId: productId
      });
    };
  };
}
