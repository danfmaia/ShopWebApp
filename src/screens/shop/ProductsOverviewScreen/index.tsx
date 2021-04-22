import { FunctionComponent, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import classes from './.module.css';
import IAppState from '../../../store/i-app-state';
import ProductActions from '../../../store/product/product-actions';
import ProductList from '../../../components/product/ProductList/index';
import LoadingIndicator from '../../../components/UI/LoadingIndicator';

const _productActions = new ProductActions();

const ProductsOverviewScreen: FunctionComponent = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null | undefined>();

  const availableProducts = useSelector((state: IAppState) => state.products.availableProducts);

  const loadProducts = useCallback(async () => {
    setError(null);
    // setIsLoading(true);
    try {
      await dispatch(_productActions.fetchProducts());
    } catch (err) {
      setError(err.message);
    }
    // setIsLoading(false);
  }, [dispatch]);

  // useEffect(() => {
  //   const unsubscribe = props.navigation.addListener('focus', loadProducts);
  //   return () => {
  //     unsubscribe();
  //   };
  // }, [loadProducts]);

  useEffect(() => {
    setIsLoading(true);
    loadProducts().then(() => {
      setIsLoading(false);
    });
  }, [loadProducts]);

  if (error) {
    return (
      <main className={'activity ' + classes.errorContainer}>
        <h3>Um erro ocorreu!</h3>
        <div className="action">
          <button onClick={loadProducts}>Tentar novamente</button>
        </div>
      </main>
    );
  }

  if (isLoading) {
    return (
      <main className="activity">
        <LoadingIndicator />
      </main>
    );
  }

  if (isLoading && availableProducts.length === 0) {
    return (
      <main className="activity">
        <h2>Não há produtos disponíveis</h2>
      </main>
    );
  }

  return (
    <main className={classes.main}>
      {/* <h2>Produtos Disponíveis</h2> */}
      <ProductList products={availableProducts} />
    </main>
  );
};

export default ProductsOverviewScreen;
