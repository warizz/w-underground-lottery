import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { routerShape } from 'react-router';
import docCookies from 'doc-cookies';
import actions from '../actions/index';
import service from '../services/index';

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
    window.FB.login((res) => {
      if (res.authResponse) {
        const accessToken = res.authResponse.accessToken;
        service
          .data
          .logIn(accessToken)
          .then((user) => {
            docCookies.setItem(`fbu_${process.env.REACT_APP_FB_APP_ID}`, user.name, 60 * 60 * 24 * 30);
            docCookies.setItem(`fbp_${process.env.REACT_APP_FB_APP_ID}`, user.picture, 60 * 60 * 24 * 30);
            docCookies.setItem(`fbat_${process.env.REACT_APP_FB_APP_ID}`, user.access_token, 60 * 60 * 24 * 30);
            this.props.setUsername(user.name);
            this.props.router.push('/');
          })
          .catch(error => error.response);
      } else {
        // console.log('User cancelled login or did not fully authorize.');
      }
    }, { scope: 'public_profile' });
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
