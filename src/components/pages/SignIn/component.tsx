import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '@/types/rootStateTypes';
import InputControl from '@/components/controls/Input/';
import Button from '@material-ui/core/Button';
import { CONVERTER_ROUTE_PATH } from '@/constants';
import isElectron from 'is-electron';
import {
  signInGoogleAuthRequest,
  signInEmailAuthRequest,
  registateEmailAuthRequest,
  removeError,
} from '@/actions/';
import { Container } from '@/components/common/commonStyles/styles';
import {
  emailValidator,
  matchingPasswordsValidator,
  passwordLengthValidation,
} from '@/utils/';
import Error from '@/components/common/error/';
import { makeStyles } from '@material-ui/core/styles';
import { SignInContainer } from './styles';

const useStyles = makeStyles((theme) => ({
  button: {
    marginTop: '5%',
    width: '100%',
  },
  input: {
    width: '100%',
    '& input': {
      fontSize: '1.3vw !important',
    },
  },
}));

const SignInPage: React.FunctionComponent = (): React.ReactElement => {
  const [isEmailValid, setIsEmailValid] = useState<string>('');
  const [isPasswordValid, setIsPasswordValid] = useState<string>('');
  const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState<string>(
    ''
  );
  const [isPasswordsMatching, setIsPasswordsMatching] = useState<string>('');
  const [isRegistering, setIsRegistering] = useState<boolean>(false);

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const classes = useStyles();
  const dispatch = useDispatch();
  const isAuth = useSelector((state: IRootState) => state.user.isAuth);

  useEffect(() => {
    setIsEmailValid(() => emailValidator(email));
    setIsPasswordValid(() => passwordLengthValidation(password));
    setIsConfirmPasswordValid(() => passwordLengthValidation(confirmPassword));
    setIsPasswordsMatching(() =>
      matchingPasswordsValidator(password, confirmPassword)
    );
  }, [email, password, confirmPassword]);

  const handleGoogleClick = () => {
    dispatch(signInGoogleAuthRequest());
    dispatch(removeError());
  };
  const handleLoginClick = () => {
    if (!isRegistering) {
      if (!isEmailValid && !isPasswordValid)
        dispatch(signInEmailAuthRequest(email, password));
    } else {
      if (
        !isEmailValid &&
        !isPasswordValid &&
        !isConfirmPasswordValid &&
        !isPasswordsMatching
      ) {
        dispatch(registateEmailAuthRequest(email, password));
        setIsRegistering(() => false);
      }
    }
  };
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(() => event.target.value);
  };
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(() => event.target.value);
  };
  const handleConfirmPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(() => event.target.value);
  };
  const handleChangeIsRegistrate = () => {
    setIsRegistering(() => !isRegistering);
    dispatch(removeError());
  };

  return !isAuth ? (
    <Container>
      <Error />
      <SignInContainer id="signIn">
        <form onSubmit={handleLoginClick}>
          Email:
          <InputControl
            error={isEmailValid}
            type="email"
            className={classes.input}
            value={email}
            onChange={handleEmailChange}
            helperText={isEmailValid}
          />
          Password:
          <InputControl
            error={isPasswordValid || (isRegistering && isPasswordsMatching)}
            type="password"
            className={classes.input}
            value={password}
            onChange={handlePasswordChange}
            helperText={
              (isRegistering && isPasswordsMatching) || isPasswordValid
            }
          />
          {isRegistering ? (
            <>
              Confirm Password:
              <InputControl
                error={
                  isConfirmPasswordValid ||
                  (isRegistering && isPasswordsMatching)
                }
                helperText={
                  (isRegistering && isPasswordsMatching) ||
                  isConfirmPasswordValid
                }
                type="password"
                className={classes.input}
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
              />
            </>
          ) : null}
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            onClick={handleLoginClick}>
            {!isRegistering ? 'Sign-In by Email' : 'Sign-Up'}
          </Button>
        </form>
        {!isElectron() ? (
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            onClick={handleGoogleClick}>
            Sign In by google
          </Button>
        ) : null}

        <Button color="primary" onClick={handleChangeIsRegistrate}>
          {isRegistering ? (
            <>Already have account? Go and Sign-In</>
          ) : (
            <>No account? Go and Sing-Up new one</>
          )}
        </Button>
      </SignInContainer>
    </Container>
  ) : (
    <Redirect to={CONVERTER_ROUTE_PATH} />
  );
};

export default SignInPage;
