import { AuthActionEnum } from './auth-actions';
import { IAuthAction, IAuthState } from './auth-interfaces';

const initialState: IAuthState = {
  token: null,
  userId: null,
  didTryAutoLogin: false
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state: IAuthState = initialState, action: IAuthAction): IAuthState => {
  switch (action.type) {
    case AuthActionEnum.AUTHENTICATE:
      return {
        token: action.token,
        userId: action.userId,
        didTryAutoLogin: true
      };
    case AuthActionEnum.SET_DID_TRY_AUTO_LOGIN:
      return {
        ...state,
        didTryAutoLogin: true
      };
    case AuthActionEnum.LOGOUT:
      return {
        ...initialState,
        didTryAutoLogin: true
      };
    default:
      return state;
  }
};
