export interface IAuthState {
  token: string | null;
  userId: string | null;
  didTryAutoLogin: boolean;
}

export interface IAuthAction {
  type: string;
  token: IAuthState['token'];
  userId: IAuthState['userId'];
  didTryAutoLogin?: IAuthState['didTryAutoLogin'];
}