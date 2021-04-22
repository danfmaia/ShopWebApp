import { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import IAppState from '../../store/i-app-state';
import ShopNavigator from '../ShopNavigator/index';

import classes from './.module.css';

type Props = {};

const Layout: FunctionComponent<Props> = (props) => {
  const isAuth = useSelector((state: IAppState) => !!state.auth.token);

  return (
    <section className={classes.container}>
      {isAuth && <ShopNavigator />}
      {/* <ShopNavigator /> */}
      <main className={classes.main}>{props.children}</main>
    </section>
  );
};

export default Layout;
