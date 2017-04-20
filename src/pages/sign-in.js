import React, { PropTypes } from 'react';
import docCookies from 'doc-cookies';
import service from '../services/index';
import Snackbar from '../components/snackbar';
import './sign-in.css';

const fetchFbSdk = () => {
  window.fbAsyncInit = () => {
    window.FB.init({
      appId: process.env.REACT_APP_FB_APP_ID,
      cookie: true,
      xfbml: true,
      version: 'v2.8',
    });
    window.FB.AppEvents.logPageView();
  };

  ((d, s, id) => {
    const fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
      return;
    }
    const js = d.createElement(s);
    js.id = id;
    js.src = '//connect.facebook.net/en_US/sdk.js';
    fjs.parentNode.insertBefore(js, fjs);
  })(document, 'script', 'facebook-jssdk');
};

class SignInPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fetching: false,
    };
    this.authenFacebook = this.authenFacebook.bind(this);
  }
  componentDidMount() {
    const hasToken = docCookies.hasItem(`fbat_${process.env.REACT_APP_FB_APP_ID}`);
    if (hasToken) this.props.router.push('/');

    fetchFbSdk();
  }
  authenFacebook(e) {
    e.preventDefault();
    const self = this;
    self.setState({ fetching: true });
    window.FB.login((res) => {
      if (res.authResponse) {
        const accessToken = res.authResponse.accessToken;
        service
          .data
          .logIn(accessToken)
          .then(({ access_token }) => {
            docCookies.setItem(`fbat_${process.env.REACT_APP_FB_APP_ID}`, access_token, 60 * 60 * 24 * 30);
            self.setState({ fetching: false });
            self.props.router.push('/');
          })
          .catch((error) => {
            if (error.response) {
              self.setState({
                alertText: `${error.response.status}: ${error.response.statusText}`,
                fetching: false,
              });
            } else {
              console.error(error); // eslint-disable-line no-console
              self.setState({ fetching: false });
            }
          });
      } else {
        self.setState({
          alertText: 'facebook authentication failed',
          fetching: false,
        });
      }
    }, { scope: 'public_profile' });
  }
  render() {
    const { alertText, fetching } = this.state;
    return (
      <div className="sign-in">
        <button className="sign-in" onClick={this.authenFacebook} disabled={fetching}>
          {fetching ? '...' : 'log in with facebook'}
        </button>
        <div className="message">
          <b>{'why log in with facebook?'}</b>
          <li>{'don\'t reinvent the wheel: facebook already have great security by 1000 top class engineers keeping your password safe.'}</li>
          <li>{'this app need only your username and profile picture, it can do no harm.'}</li>
        </div>
        <Snackbar text={alertText} timer={2000} onClose={() => this.setState({ alertText: '' })} />
      </div>
    );
  }
}

SignInPage.propTypes = {
  router: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
};

export default SignInPage;
