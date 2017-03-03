import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { routerShape } from 'react-router';
import docCookies from 'doc-cookies';
import actions from '../actions/index';

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
      username: '',
    };
    this.authenFacebook = this.authenFacebook.bind(this);
  }
  componentDidMount() {
    // docCookies.removeItem('underground-lottery_username');
  }
  authenFacebook(e) {
    e.preventDefault();
    window.FB.login((loginResponse) => {
      if (loginResponse.authResponse) {
        window.FB.api('/me?fields=email', (emailResponse) => {
          const username = emailResponse.email.toLowerCase();
          docCookies.setItem('underground-lottery_username', username, 60 * 60 * 24);
          this.props.setUsername(username);
          this.props.router.push('/');
        });
      } else {
        // console.log('User cancelled login or did not fully authorize.');
      }
    }, { scope: 'email' });
  }
  render() {
    return (
      <div style={styles.base}>
        <form className="container col-xs-12 col-sm-3 col-md-3">
          <div className="col-md-12 col-xs-12">
            <button className="btn btn-primary" style={styles.button.signIn} onClick={this.authenFacebook}>{'facebook'}</button>
          </div>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => (
  {
    setUsername: username => dispatch(actions.user.setUsername(username)),
  }
);

SignInPage.propTypes = {
  router: routerShape,
  setUsername: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(SignInPage);
