import { FormEvent, FunctionComponent, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import classes from './.module.css';
import Card from '../../../components/UI/Card';
import AuthActions from '../../../store/auth/auth-actions';
import { ROUTES } from '../../../App';
import LoadingIndicator from '../../../components/UI/LoadingIndicator';

const _authActions = new AuthActions();

const AuthScreen: FunctionComponent = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null | undefined>();
  const [isLogin, setIsLogin] = useState<boolean>(true);

  // TODO: Improve error displaying.
  useEffect(() => {
    if (error) {
      alert('An Error Occurred! ' + error);
    }
  }, [error]);

  useEffect(() => {
    dispatch(_authActions.logout());
  });

  const authHandler = async (event: FormEvent) => {
    event.preventDefault();

    // TODO: Treat error.
    if (!emailInputRef.current || !passwordInputRef.current) {
      return;
    }

    let action;
    if (isLogin) {
      action = _authActions.login(emailInputRef.current?.value, passwordInputRef.current?.value);
    } else {
      action = _authActions.signup(emailInputRef.current?.value, passwordInputRef.current?.value);
    }
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(action);
      history.replace(ROUTES['products']);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <main className="activity">
        <LoadingIndicator />
      </main>
    );
  }

  return (
    <main className={classes.main}>
      <h2>Loja Demo</h2>
      <Card>
        <form className={classes.form} onSubmit={authHandler}>
          <div className={classes.control}>
            <label htmlFor="email">Email</label>
            <input id="email" type="email" required ref={emailInputRef} />
          </div>
          <div className={classes.control}>
            <label htmlFor="password">Senha</label>
            <input id="password" type="password" required ref={passwordInputRef} />
          </div>
          <div className={classes.actions}>
            <button type="submit">{isLogin ? 'Entrar' : 'Cadastrar-se'}</button>
          </div>
          <div className={classes.actions + ' ' + classes.secondary}>
            <button
              type="button"
              onClick={() => {
                setIsLogin((prevState) => !prevState);
              }}
            >
              {isLogin ? 'Primeiro acesso? Clique aqui!' : 'Já é usuário? Clique aqui!'}
            </button>
          </div>
        </form>
      </Card>
    </main>
  );
};

export default AuthScreen;
