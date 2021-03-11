import { React, useState } from 'react';
import { Redirect } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import InputControl from '@/components/controls/Input/';
import Button from '@material-ui/core/Button';
import { CONVERTER_ROUTER_PATH } from '@/constants';
import {
  signInGoogleAuthRequest,
  signInEmailAuthRequest,
} from '@/actions/';
import { Container } from '@/components/common/commonStyles/styles';
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
  const classes = useStyles();
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.user.isAuth);

  const handleGoogleClick = () => {
    dispatch(signInGoogleAuthRequest());
  };
  const handleLoginClick = () => {
    dispatch(signInEmailAuthRequest(email, password));
  };
  const handleEmailChange = (event) => {
    setEmail(() => event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(() => event.target.value);
  };

  return !isAuth ? (
    <Container>
      <SignInContainer id="signIn">
        Email:
        <InputControl
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
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          onClick={handleLoginClick}>
          Login by email
        </Button>
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          onClick={handleGoogleClick}>
          Sign In by google
        </Button>
      </SignInContainer>
    </Container>
  ) : (
    <Redirect to={CONVERTER_ROUTER_PATH} />
  );
};

export default SignInPage;
