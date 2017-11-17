/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import './sign-in.css';

const SignInPage = props => {
  const { errorText, fetching, signInButtonClickedCallback } = props;

  let signInButtonText = 'Log in with Facebook';
  if (fetching) {
    signInButtonText = '...';
  }

  let messageBoxElement = (
    <div className="message">
      <b>{'why log in with facebook?'}</b>
      <li>
        {
          "don't reinvent the wheel: facebook already have great security by 1000 top class engineers keeping your password safe."
        }
      </li>
      <li>{'this app need only your username and profile picture, it can do no harm.'}</li>
    </div>
  );
  if (errorText) {
    messageBoxElement = (
      <div className="message error">
        <b>{errorText}</b>
      </div>
    );
  }

  return (
    <div className="sign-in">
      <button
        className="sign-in"
        disabled={fetching}
        id="sign-in"
        onClick={signInButtonClickedCallback}
      >
        {signInButtonText}
      </button>
      {messageBoxElement}
    </div>
  );
};

SignInPage.propTypes = {
  errorText: PropTypes.string,
  fetching: PropTypes.bool,
  signInButtonClickedCallback: PropTypes.func,
};

SignInPage.defaultProps = {
  errorText: null,
  fetching: false,
  signInButtonClickedCallback() {},
};

export default SignInPage;
