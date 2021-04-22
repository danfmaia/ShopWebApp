import { FunctionComponent } from 'react';
import Product from '../../../models/product';

import classes from './.module.css';
import ProductItem from '../ProductItem/index';

type Props = {
  products: Product[];
};

const ProductList: FunctionComponent<Props> = (props) => {
  return (
    <div className={classes.grid}>
      {props.products.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
