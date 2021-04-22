import { applyMiddleware, combineReducers, createStore, Store } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import { Route, Switch } from 'react-router-dom';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/integration/react';

import AppNavigator from './navigation/AppNavigator';

import AuthScreen from './screens/auth/AuthScreen';
import ProductsOverviewScreen from './screens/shop/ProductsOverviewScreen';
import Layout from './navigation/Layout';
import ProductDetailScreen from './screens/shop/ProductDetailScreen';

import authReducer from './store/auth/auth-reducer';
import productReducer from './store/product/product-reducer';
import cartReducer from './store/cart/cart-reducer';

const rootReducer = combineReducers({
  auth: authReducer,
  products: productReducer,
  cart: cartReducer
  // orders: ordersReducer,
});

const persistConfig = {
  key: 'root',
  storage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store: Store = createStore(persistedReducer, applyMiddleware(ReduxThunk));
const persistor = persistStore(store);

export enum ROUTES {
  'root' = '/',
  'auth' = '/auth',
  'products' = '/products',
  'product' = '/product',
  'carrinho' = '/carrinho'
}

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Layout>
          <Switch>
            <Route path={ROUTES.root} exact>
              <AppNavigator />
            </Route>
            <Route path={ROUTES.auth}>
              <AuthScreen />
            </Route>
            <Route path={ROUTES.products}>
              <ProductsOverviewScreen />
            </Route>
            <Route path={ROUTES.product}>
              <ProductDetailScreen />
            </Route>
            {/* <Route path={ROUTES.carrinho}>
            <CartScreen />
          </Route> */}
          </Switch>
        </Layout>
      </PersistGate>
    </Provider>
  );
}
