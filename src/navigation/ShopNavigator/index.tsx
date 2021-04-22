import { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';

import classes from './.module.css';
import { ROUTES } from '../../App';
import { useSelector } from 'react-redux';
import IAppState from '../../store/i-app-state';

const ShopNavigator: FunctionComponent = () => {
  const cartTotalQuantity = useSelector((state: IAppState) => state.cart.totalQuantity);

  return (
    <header className={classes.header}>
      <div className={classes.logo}>Loja Demo</div>
      <nav>
        <ul>
          <li>
            <Link to={ROUTES.auth}>Sair</Link>
          </li>
        </ul>
        <ul>
          <li>
            <Link to={ROUTES.products}>Produtos Disponíveis</Link>
          </li>
          {/* <li>
            <Link to={ROUTES.carrinho}>Adicionar Produto</Link>
          </li> */}
          <li>
            <Link to={ROUTES.carrinho}>
              Carrinho
              <span className={classes.badge}>{cartTotalQuantity ?? 0}</span>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default ShopNavigator;
