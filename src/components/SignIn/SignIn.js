/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import { Button, Message } from 'semantic-ui-react';
import './SignIn.css';

const SignIn = ({ awaiting, errorText, onSignIn }) => {
  return (
    <div className='SignIn'>
      <Button loading={awaiting} onClick={onSignIn} primary>
        Sign in with Facebook
      </Button>
      <Message info>
        <Message.Header>Why log in with facebook?</Message.Header>
        <p>
          - Don\'t reinvent the wheel: facebook already have great security by
          1000 top class engineers keeping your password safe.
        </p>
        <p>
          - This app need only your username and profile picture, it can do no
          harm.
        </p>
      </Message>
      {errorText && (
        <Message negative>
          <Message.Header>An error occurred</Message.Header>
          <p>{errorText}</p>
        </Message>
      )}
    </div>
  );
};

SignIn.propTypes = {
  awaiting: PropTypes.bool,
  errorText: PropTypes.string,
  onSignIn: PropTypes.func,
};

SignIn.defaultProps = {
  awaiting: false,
  errorText: '',
  onSignIn() {},
};

export default SignIn;
