import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import * as color from '../constants/styles/color';
import * as paperShadow from '../constants/styles/paper-shadow';
import * as config from '../config';
import Overlay from './overlay';

const styles = {
  overlay: {
    base: {
      backgroundColor: 'rgba(0,0,0,0.5)',
      height: '100vh',
      left: '0',
      position: 'absolute',
      top: '0',
      width: '100%',
    },
    active: {
      display: 'inherit',
    },
    inactive: {
      display: 'none',
    },
  },
  drawer: {
    active: {
      left: '0',
    },
    base: {
      backgroundColor: 'white',
      boxShadow: paperShadow.level5,
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
    backgroundColor: 'rgba(144,164,174 ,1)',
    display: 'flex',
    flexDirection: 'column',
    height: '150px',
    padding: '1em',
  },
  username: {
    color: 'white',
  },
  versionContainer: {
    backgroundColor: 'rgba(144,164,174 ,1)',
    color: 'white',
    padding: '1em',
  },
  menuItem: {
    base: {
      alignItems: 'center',
      border: 'none',
      color: 'black',
      display: 'flex',
      height: '5em',
      listStyleType: 'none',
      padding: '1em',
      width: '100%',
    },
    active: {
      backgroundColor: '#F5F5F5',
      color: color.primary,
      fontWeight: 'bold',
    },
    inactive: {
      backgroundColor: 'transparent',
    },
  },
};


class Drawer extends React.Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.open !== this.props.open;
  }
  render() {
    const { props } = this;
    if (!props.username) {
      return <div />;
    }
    // const isAdmin = props.username === 'warizz' || props.username === 'tob32';
    const isAdmin = true;
    const drawerStyles = props.open ? { ...styles.drawer.base, ...styles.drawer.active } : { ...styles.drawer.base, ...styles.drawer.inactive };
    const menuItemProps = {
      activeStyle: { ...styles.menuItem.base, ...styles.menuItem.active },
      onClick: props.toggle,
      style: { ...styles.menuItem.base, ...styles.menuItem.inactive },
    };
    return (
      <div>
        <Overlay active={props.open} />
        <div style={drawerStyles}>
          <div style={styles.versionContainer}>
            <a href="https://github.com/warizz/underground-lottery/releases" target="_blank" rel="noopener noreferrer" style={{ color: 'white' }}>
              {`v ${config.appVersion}`}
            </a>
          </div>
          <div style={styles.userMenuGroup}>
            <div style={{ ...styles.avatar, marginBottom: '1em' }}>
              {props.username.toUpperCase().substring(0, 1)}
            </div>
            <div style={styles.username}>
              {props.username.toUpperCase()}
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
              <Link to="/sign-in" {...menuItemProps}>
                <i className="material-icons">exit_to_app</i>
                <span style={{ marginLeft: '1em' }}>Sign off</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

Drawer.propTypes = {
  open: PropTypes.bool,
  toggle: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
};

export default Drawer;
