import { StoragePaths } from '../../global/constants';

let timer: NodeJS.Timeout;

export enum AuthActionEnum {
  AUTHENTICATE = 'AUTHENTICATE',
  SET_DID_TRY_AUTO_LOGIN = 'SET_DID_TRY_AUTO_LOGIN',
  LOGOUT = 'LOGOUT'
}

export default class AuthActions {
  public authenticate = (userId: string, token: string, expirationTime: number) => {
    return (dispatch: any) => {
      dispatch(this.setLogoutTimer(expirationTime));
      dispatch({ type: AuthActionEnum.AUTHENTICATE, userId: userId, token: token });
    };
  };

  public setDidTryAutoLogin = () => {
    return { type: AuthActionEnum.SET_DID_TRY_AUTO_LOGIN };
  };

  public signup = (email: string, password: string) => {
    return async (dispatch: any) => {
      const response = await fetch(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDxUdqHinSvlkRLtEQRkv7maFDMukAYFX4',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: email,
            password: password,
            returnSecureToken: true
          })
        }
      );

      if (!response.ok) {
        const errorResData = await response.json();
        const errorId = errorResData.error.message;
        let message = 'Something went wrong!';
        if (errorId === 'EMAIL_EXISTS') {
          message = 'This email is already signed up!';
        }
        console.log(errorResData);
        throw new Error(message);
      }

      const resData = await response.json();
      // console.log(resData);
      dispatch(
        this.authenticate(resData.localId, resData.idToken, parseInt(resData.expiresIn) * 1000)
      );

      const expirationDate = new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000);
      this.saveDataToStorage(resData.idToken, resData.localId, expirationDate);
    };
  };

  public login = (email: string, password: string) => {
    return async (dispatch: any) => {
      const response = await fetch(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDxUdqHinSvlkRLtEQRkv7maFDMukAYFX4',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: email,
            password: password,
            returnSecureToken: true
          })
        }
      );

      if (!response.ok) {
        const errorResData = await response.json();
        const errorId = errorResData.error.message;
        let message = 'Algo deu errado!';
        if (errorId === 'EMAIL_NOT_FOUND' || errorId === 'INVALID_PASSWORD') {
          message = 'Usuário ou senha incorretos!';
        }
        console.log(errorResData);
        throw new Error(message);
      }

      const resData = await response.json();
      // console.log(resData);
      dispatch(
        this.authenticate(resData.localId, resData.idToken, parseInt(resData.expiresIn) * 1000)
      );

      const expirationDate = new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000);
      this.saveDataToStorage(resData.idToken, resData.localId, expirationDate);
    };
  };

  public logout = () => {
    this.clearLogoutTimer();
    localStorage.removeItem(StoragePaths.USER_DATA);
    return { type: AuthActionEnum.LOGOUT };
  };

  private clearLogoutTimer = () => {
    if (timer) {
      clearTimeout(timer);
    }
  };

  private setLogoutTimer = (expirationTime: number) => {
    return (dispatch: any) => {
      timer = setTimeout(() => {
        console.log('expirationTime: ' + expirationTime);
        dispatch(this.logout());
      }, expirationTime);
    };
  };

  private saveDataToStorage = (token: string, userId: string, expirationDate: Date | null) => {
    let expiryDate: string | null;
    if (expirationDate === null) {
      expiryDate = null;
    } else {
      expiryDate = expirationDate.toISOString();
    }
    localStorage.setItem(
      StoragePaths.USER_DATA,
      JSON.stringify({
        token: token,
        userId: userId,
        expiryDate: expiryDate
      })
    );
  };
}
