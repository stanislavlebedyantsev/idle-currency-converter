import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '@/types/rootStateTypes';
import InputControl from '@/components/controls/Input/';
import Button from '@material-ui/core/Button';
import { CONVERTER_ROUTE_PATH } from '@/constants';
import isElectron from 'is-electron';
import { useTranslation } from 'react-i18next';
import {
  signInGoogleAuthRequest,
  signInEmailAuthRequest,
  registateEmailAuthRequest,
  removeError,
} from '@/actions/';
import { Container } from '@/theme/styles';
import {
  emailValidator,
  matchingPasswordsValidator,
  passwordLengthValidation,
} from '@/utils/';
import Error from '@/components/common/error';
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
  const { t, i18n } = useTranslation();
  const [isEmailValid, setIsEmailValid] = useState<string>('');
  const [isPasswordValid, setIsPasswordValid] = useState<string>('');
  const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState<string>(
    ''
  );
  const [arePasswordsMatching, setArePasswordsMatching] = useState<string>('');
  const [isRegistering, setIsRegistering] = useState<boolean>(false);

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const classes = useStyles();
  const dispatch = useDispatch();
  const isAuthed = useSelector((state: IRootState) => state.user.isAuthed);

  useEffect(() => {
    setIsEmailValid(() => emailValidator(email));
    setIsPasswordValid(() => passwordLengthValidation(password));
    setIsConfirmPasswordValid(() => passwordLengthValidation(confirmPassword));
    setArePasswordsMatching(() =>
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
        !arePasswordsMatching
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

  return !isAuthed ? (
    <Container>
      <Error />
      <SignInContainer id="signIn">
        <form onSubmit={handleLoginClick}>
          {t('email')}
          <InputControl
            error={isEmailValid}
            type="email"
            className={classes.input}
            value={email}
            onChange={handleEmailChange}
            helperText={isEmailValid}
          />
          {t('password')}
          <InputControl
            error={isPasswordValid || (isRegistering && arePasswordsMatching)}
            type="password"
            className={classes.input}
            value={password}
            onChange={handlePasswordChange}
            helperText={
              (isRegistering && arePasswordsMatching) || isPasswordValid
            }
          />
          {isRegistering ? (
            <>
              {t('confirmPassword')}
              <InputControl
                error={
                  isConfirmPasswordValid ||
                  (isRegistering && arePasswordsMatching)
                }
                helperText={
                  (isRegistering && arePasswordsMatching) ||
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
            {!isRegistering ? t('singInByEmail') : t('singUp')}
          </Button>
        </form>
        {!isElectron() ? (
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            onClick={handleGoogleClick}>
            {t('singInByGoogle')}
          </Button>
        ) : null}

        <Button
          color="primary"
          onClick={handleChangeIsRegistrate}
          data-testid="signUp">
          {isRegistering ? t('goSignIn') : t('goSignUp')}
        </Button>
      </SignInContainer>
    </Container>
  ) : (
    <Redirect to={CONVERTER_ROUTE_PATH} />
  );
};

export default SignInPage;
