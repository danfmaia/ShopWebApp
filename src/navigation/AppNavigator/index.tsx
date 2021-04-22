import { FunctionComponent, useEffect } from 'react';
import { useSelector } from 'react-redux';
import StartupScreen from '../../screens/auth/StartupScreen/index';

import IAppState from '../../store/i-app-state';
import { useHistory } from 'react-router-dom';
import { ROUTES } from '../../App';

type Props = {
  //
};

const AppNavigator: FunctionComponent<Props> = (props) => {
  const history = useHistory();

  const isAuth = useSelector((state: IAppState) => !!state.auth.token);
  const didTryAutoLogin = useSelector((state: IAppState) => state.auth.didTryAutoLogin);

  useEffect(() => {
    if (isAuth) {
      history.replace(ROUTES['products']);
    } else if (!isAuth && didTryAutoLogin) {
      history.replace(ROUTES['auth']);
    }
  }, [history, isAuth, didTryAutoLogin]);

  return <div>{!isAuth && !didTryAutoLogin && <StartupScreen />}</div>;
};

export default AppNavigator;
