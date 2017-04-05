import React, { PropTypes } from 'react';
import { Link, routerShape } from 'react-router';
import docCookies from 'doc-cookies';
import * as config from '../config';
import Overlay from './overlay';
import service from '../services/index';
import Snackbar from './snackbar';

const styles = {
  drawer: {
    active: {
      left: '0',
    },
    base: {
      backgroundColor: 'white',
      boxShadow: 'rgba(0, 0, 0, 0.156863) 0px 3px 10px, rgba(0, 0, 0, 0.227451) 0px 3px 10px',
      height: '100vh',
      overflow: 'auto',
      position: 'absolute',
      transition: 'left .5s',
      top: '0',
      width: '250px',
      zIndex: 1,
    },
    inactive: {
      left: '-300px',
    },
  },
  avatar: {
    alignItems: 'center',
    backgroundColor: 'white',
    backgroundSize: 'contain',
    borderRadius: '50%',
    display: 'flex',
    fontSize: '20px',
    fontWeight: 'bold',
    height: '70px',
    justifyContent: 'center',
    width: '70px',
  },
  userMenuGroup: {
    alignItems: 'flex-start',
    display: 'flex',
    flexDirection: 'column',
    height: '150px',
    padding: '1em',
  },
  username: {
    color: 'white',
  },
  versionContainer: {
    color: 'white',
    padding: '1em',
  },
  menuItem: {
    base: {
      alignItems: 'center',
      border: 'none',
      color: 'black',
      cursor: 'pointer',
      display: 'flex',
      height: '5em',
      listStyleType: 'none',
      padding: '1em',
      width: '100%',
    },
    active: {
      backgroundColor: '#F5F5F5',
      fontWeight: 'bold',
    },
    inactive: {
      backgroundColor: 'transparent',
    },
  },
};

class Drawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      alertText: '',
      hasAlert: false,
    };
    this.logOut = this.logOut.bind(this);
  }
  shouldComponentUpdate(nextProps) {
    return nextProps.active !== this.props.active;
  }
  logOut() {
    const cookieName = `fbat_${process.env.REACT_APP_FB_APP_ID}`;
    const accessToken = docCookies.getItem(cookieName);
    service
      .data
      .logOut(accessToken)
      .then(() => this.props.router.push('/log-in'))
      .catch(error => (
        this.setState({
          alertText: `${error.response.status}: ${error.response.statusText}`,
          hasAlert: true,
        })
      ));
  }
  render() {
    const { alertText, hasAlert } = this.state;
    const { active, isAdmin, themeColor = 'black', toggle, username, userPic } = this.props;
    if (!username) {
      return <div />;
    }
    const drawerStyles = active ? { ...styles.drawer.base, ...styles.drawer.active } : { ...styles.drawer.base, ...styles.drawer.inactive };
    const menuItemProps = {
      activeStyle: { ...styles.menuItem.base, ...styles.menuItem.active },
      onClick: toggle,
      style: { ...styles.menuItem.base, ...styles.menuItem.inactive },
    };
    return (
      <div>
        <Overlay active={active} clickHandler={toggle} />
        <Snackbar active={hasAlert} text={alertText} timer={2000} onClose={() => this.setState({ hasAlert: false, alertText: '' })} />
        <div style={drawerStyles}>
          <div style={{ ...styles.versionContainer, backgroundColor: themeColor }}>
            <a href="https://github.com/warizz/underground-lottery-on-fire/releases" target="_blank" rel="noopener noreferrer" style={{ color: 'white' }}>
              {`v ${config.appVersion}`}
            </a>
          </div>
          <div style={{ ...styles.userMenuGroup, backgroundColor: themeColor }}>
            <div style={{ ...styles.avatar, marginBottom: '1em', backgroundImage: `url(${userPic})` }} />
            <div style={styles.username}>
              {username.toUpperCase()}
            </div>
          </div>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            <li>
              <Link to="/" {...menuItemProps}>
                <i className="material-icons">monetization_on</i>
                <span style={{ marginLeft: '1em' }}>Bet</span>
              </Link>
            </li>
            <li>
              <Link to="/history" {...menuItemProps}>
                <i className="material-icons">assignment</i>
                <span style={{ marginLeft: '1em' }}>History</span>
              </Link>
            </li>
            {isAdmin && (
              <li>
                <Link to="/dashboard" {...menuItemProps}>
                  <i className="material-icons">dashboard</i>
                  <span style={{ marginLeft: '1em' }}>Dashboard</span>
                </Link>
              </li>
            )}
            <li>
              <Link to="/faq" {...menuItemProps}>
                <i className="material-icons">help</i>
                <span style={{ marginLeft: '1em' }}>FAQ</span>
              </Link>
            </li>
            <li>
              <div to="/log-in" {...menuItemProps} onClick={this.logOut}>
                <i className="material-icons">exit_to_app</i>
                <span style={{ marginLeft: '1em' }}>Log out</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

Drawer.propTypes = {
  active: PropTypes.bool,
  themeColor: PropTypes.string,
  toggle: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  userPic: PropTypes.string.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  router: routerShape,
};

export default Drawer;
