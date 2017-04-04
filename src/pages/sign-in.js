import React from 'react';
import { routerShape } from 'react-router';
import docCookies from 'doc-cookies';
import service from '../services/index';
import Snackbar from '../components/snackbar';

const styles = {
  base: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'center',
  },
  button: {
    signIn: {
      width: '100%',
    },
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
          .then((user) => {
            docCookies.setItem(`fbat_${process.env.REACT_APP_FB_APP_ID}`, user.access_token, 60 * 60 * 24 * 30);
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
      <div style={styles.base}>
        <form className="container col-xs-12 col-sm-3 col-md-3">
          <div className="col-md-12 col-xs-12">
            <button
              className="btn btn-primary"
              style={styles.button.signIn}
              onClick={this.authenFacebook}
              disabled={fetching}
            >
              {fetching ? '...' : 'facebook'}
            </button>
          </div>
        </form>
        <Snackbar active={hasAlert} text={alertText} timer={2000} onClose={() => this.setState({ hasAlert: false, alertText: '' })} />
      </div>
    );
  }
}

SignInPage.propTypes = {
  router: routerShape,
};

export default SignInPage;
