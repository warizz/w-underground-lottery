import React from 'react';
import { routerShape } from 'react-router';
import docCookies from 'doc-cookies';
import service from '../services/index';
import Snackbar from '../components/snackbar';

const style = {
  base: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'center',
    width: '100%',
  },
  button: {
    logIn: {
      width: '300px',
      backgroundColor: '#2185d0',
      color: 'white',
      border: 'none',
      borderRadius: '2px',
      padding: '10px',
      maxWidth: '300px',
    },
  },
  message: {
    width: '300px',
    maxWidth: '300px',
    background: '#f8f8f9',
    color: 'rgba(0,0,0,.87)',
    borderRadius: '5px',
    padding: '10px',
    border: '1px solid #b8bfc3',
    marginTop: '10px',
  },
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
          .catch(error => (
            self.setState({
              alertText: `${error.response.status}: ${error.response.statusText}`,
              fetching: false,
              hasAlert: true,
            })
          ));
      } else {
        self.setState({
          alertText: 'facebook authentication failed',
          fetching: false,
          hasAlert: true,
        });
      }
    }, { scope: 'public_profile' });
  }
  render() {
    const { alertText, fetching, hasAlert } = this.state;
    return (
      <div style={style.base}>
        <button
          style={style.button.logIn}
          onClick={this.authenFacebook}
          disabled={fetching}
        >
          {fetching ? '...' : 'log in with facebook'}
        </button>
        <div style={style.message}>
          <b>{'why log in with facebook?'}</b>
          <li>{'don\'t reinvent the wheel: facebook already have great security by 1000 top class engineers keeping your password safe.'}</li>
          <li>{'this app need only your username and profile picture, it can do no harm.'}</li>
        </div>
        <Snackbar active={hasAlert} text={alertText} timer={2000} onClose={() => this.setState({ hasAlert: false, alertText: '' })} />
      </div>
    );
  }
}

SignInPage.propTypes = {
  router: routerShape,
};

export default SignInPage;
