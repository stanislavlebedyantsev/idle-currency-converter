import { React, useState } from 'react';
import { Redirect } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import InputControl from '@/components/controls/Input/';
import Button from '@material-ui/core/Button';
import { CONVERTER_ROUTER_PATH } from '@/constants';
import {
  setError,
  signInGoogleAuthRequest,
  signInEmailAuthRequest,
  registateEmailAuthRequest,
  removeError,
} from '@/actions/';
import { Container } from '@/components/common/commonStyles/styles';
import { emailValidator, passwordValidator } from '@/utils/';
import Error from '@/components/common/error/';
import { makeStyles } from '@material-ui/core/styles';
import { SignInContainer } from './styles';

const useStyles = makeStyles((theme) => ({
  button: {
    marginTop: '5%',
  },
  input: {
    width: '100%',
    '& input': {
      fontSize: '1.5vh !important',
    },
  },
}));

const SignInPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isRegistrate, setisRegistrate] = useState(false);
  const classes = useStyles();
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.user.isAuth);

  const handleGoogleClick = () => {
    dispatch(signInGoogleAuthRequest());
    dispatch(removeError());
  };
  const handleLoginClick = () => {
    const emailValid = emailValidator(email);
    const passwordValid = passwordValidator(password, confirmPassword);
    if (!isRegistrate) {
      dispatch(signInEmailAuthRequest(email, password));
    } else {
      if (passwordValid || emailValid) {
        dispatch(
          setError({ message: `${emailValid || ''}${passwordValid || ''}` })
        );
      } else {
        dispatch(registateEmailAuthRequest(email, password));
        setisRegistrate(() => false);
      }
    }
  };
  const handleEmailChange = (event) => {
    setEmail(() => event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(() => event.target.value);
  };
  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(() => event.target.value);
  };
  const handleChangeIsRegistrate = () => {
    setisRegistrate(() => !isRegistrate);
    dispatch(removeError());
  };

  return !isAuth ? (
    <Container>
      <Error />
      <SignInContainer id="signIn">
        <form onSubmit={handleLoginClick}>
          Email:
          <InputControl
            type="email"
            className={classes.input}
            value={email}
            onChange={handleEmailChange}
          />
          Password:
          <InputControl
            type="password"
            className={classes.input}
            value={password}
            onChange={handlePasswordChange}
          />
          {isRegistrate ? (
            <>
              Confirm Password:
              <InputControl
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
            {!isRegistrate ? <>Login by email</> : <>Registrate</>}
          </Button>
        </form>
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          onClick={handleGoogleClick}>
          Sign In by google
        </Button>
        <Button color="primary" onClick={handleChangeIsRegistrate}>
          {isRegistrate ? (
            <>Already have account? Go and log in</>
          ) : (
            <>No account? Go and registrate new one</>
          )}
        </Button>
      </SignInContainer>
    </Container>
  ) : (
    <Redirect to={CONVERTER_ROUTER_PATH} />
  );
};

export default SignInPage;
