import { FunctionComponent, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { StoragePaths } from '../../../global/constants';

import AuthActions from '../../../store/auth/auth-actions';
import LoadingIndicator from '../../../components/UI/LoadingIndicator';

const _authActions = new AuthActions();

const StartupScreen: FunctionComponent = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const tryLogin = async () => {
      const userData = localStorage.getItem(StoragePaths.USER_DATA);
      if (!userData) {
        // props.navigation.navigate('Auth');
        dispatch(_authActions.setDidTryAutoLogin());
        return;
      }
      const transformedData = JSON.parse(userData);
      const { token, userId, expiryDate } = transformedData;

      const expirationDate = new Date(expiryDate);
      if (expirationDate <= new Date() || !token || !userId) {
        // props.navigation.navigate('Auth');
        dispatch(_authActions.setDidTryAutoLogin());
        return;
      }

      const expirationTime = expirationDate.getTime() - new Date().getTime();

      // props.navigation.navigate('Shop');
      dispatch(_authActions.authenticate(userId, token, expirationTime));
    };

    tryLogin();
  }, [dispatch]);

  return <LoadingIndicator />;
};

export default StartupScreen;
