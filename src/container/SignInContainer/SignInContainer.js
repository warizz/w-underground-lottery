import React from 'react';
import PropTypes from 'prop-types';
import SignIn from '../../components/SignIn';

class SignInContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fetching: false,
    };
    this.authenFacebook = this.authenFacebook.bind(this);
  }
  componentDidMount() {
    const hasToken = this.props.cookieManager.hasItem(
      `fbat_${process.env.REACT_APP_FB_APP_ID}`
    );
    if (hasToken) {
      this.props.router.push('/');
    }
  }
  authenFacebook() {
    this.setState({ fetching: true });
    return window.FB.login(
      res => {
        if (res.authResponse) {
          const accessToken = res.authResponse.accessToken;
          return this.props.service.data
            .logIn(accessToken)
            .then(({ access_token: accessToken }) => {
              this.props.cookieManager.setItem(
                `fbat_${process.env.REACT_APP_FB_APP_ID}`,
                accessToken,
                60 * 60 * 24 * 30
              );
              this.setState({ fetching: false });
              this.props.router.push('/');
            })
            .catch(() => {
              // TODO: create error logging
              this.setState({
                alertText: 'Server error',
                fetching: false,
              });
            });
        }
        this.setState({
          alertText: 'Facebook authentication failed',
          fetching: false,
        });
        return Promise.resolve();
      },
      { scope: 'public_profile' }
    );
  }
  render() {
    const { alertText, fetching } = this.state;
    return (
      <SignIn
        errorText={alertText}
        fetching={fetching}
        onSignIn={this.authenFacebook}
      />
    );
  }
}

SignInContainer.propTypes = {
  cookieManager: PropTypes.shape({
    hasItem: PropTypes.func,
    setItem: PropTypes.func,
  }),
  router: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
  service: PropTypes.shape({
    data: PropTypes.shape({
      logIn: PropTypes.func,
    }),
  }),
};

SignInContainer.defaultProps = {
  cookieManager: {
    hasItem() {},
    setItem() {},
  },
  router: {
    push() {},
  },
  service: {
    cookie: {
      has() {},
    },
    data: {
      logIn: async () => {},
    },
  },
};

export default SignInContainer;
