import { FunctionComponent } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import classes from './.module.css';
import Card from '../../UI/Card';
import Product from '../../../models/product';
import CartActions from '../../../store/cart/cart-actions';
import { ROUTES } from '../../../App';
import CartItem from '../../../models/cart-item';
import IAppState from '../../../store/i-app-state';

const _cartActions = new CartActions();

type Props = {
  product: Product;
};

const ProductItem: FunctionComponent<Props> = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const product: Product = props.product;

  const cartItem: CartItem | undefined = useSelector((state: IAppState) => state.cart.items)[
    product.id
  ];
  const quantityToBuy = cartItem ? cartItem.quantity : 0;

  const goToDetailsHandler = () => {
    history.push(`${ROUTES.product}/${product.id}`, {
      product: product
    });
  };

  const addToCartHandler = () => {
    dispatch(_cartActions.addToCart(product));
  };

  return (
    <Card>
      <div className={classes.image}>
        <img src={product.imageUrl} alt={product.title} />
      </div>
      <div className={classes.content}>
        <h3>{product.title}</h3>
        <p>R${product.price.toFixed(2)}</p>
      </div>
      <div className={classes.content + ' ' + classes.purchase}>
        {quantityToBuy > 0 && <p>{quantityToBuy} - R${(quantityToBuy * product.price).toFixed(2)}</p>}
      </div>
      <div className="action">
        <button className="secondary" onClick={goToDetailsHandler}>
          Ver detalhes
        </button>
        <button onClick={addToCartHandler}>Adicionar ao carrinho</button>
      </div>
    </Card>
  );
};

export default ProductItem;
