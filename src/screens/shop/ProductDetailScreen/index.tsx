import { useDispatch, useSelector } from 'react-redux';

import classes from './.module.css';
import Product from '../../../models/product';
import IAppState from '../../../store/i-app-state';
import CartActions from '../../../store/cart/cart-actions';
import { useHistory } from 'react-router-dom';
import Card from '../../../components/UI/Card';
import CartItem from '../../../models/cart-item';

const _cartActions = new CartActions();

const ProductDetailScreen = () => {
  const dispatch = useDispatch();

  const history = useHistory<{ product: Product }>();
  const product = history.location.state?.product;

  const selectedProduct = useSelector((state: IAppState) =>
    state.products.availableProducts.find((prod) => prod.id === product.id)
  );

  const cartItem: CartItem | undefined = useSelector((state: IAppState) => state.cart.items)[
    product.id
  ];
  const quantityToBuy = cartItem ? cartItem.quantity : 0;

  const addToCartHandler = () => {
    // TODO: Tratar erro.
    if (!selectedProduct) {
      throw new Error();
    }
    dispatch(_cartActions.addToCart(selectedProduct));
  };

  const removeFromCartHandler = () => {
    // TODO: Tratar erro.
    if (!selectedProduct) {
      throw new Error();
    }
    dispatch(_cartActions.removeFromCart(selectedProduct.id));
  };

  return (
    <main className={classes.main}>
      <Card>
        <div className={classes.image}>
          <img src={product.imageUrl} alt={product.title} />
        </div>
      </Card>
      <div className={classes.contentColumn}>
        <div className={classes.content}>
          <h2>{product.title}</h2>
        </div>
        <div className={classes.content}>
          <h3>R${product.price.toFixed(2)}</h3>
        </div>
        <div className={classes.content}>
          <p>{product.description}</p>
        </div>
        <div className={classes.content + ' ' + classes.purchase}>
          {quantityToBuy > 0 && (
            <p>
              {quantityToBuy} - R${(quantityToBuy * product.price).toFixed(2)}
            </p>
          )}
        </div>
        <div>
          <div className="action">
            <button
              className="secondary"
              onClick={removeFromCartHandler}
              disabled={quantityToBuy === 0}
            >
              Remover do carrinho
            </button>
          </div>
          <div className="action">
            <button onClick={addToCartHandler}>Adicionar ao carrinho</button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductDetailScreen;
