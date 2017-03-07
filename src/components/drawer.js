import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import * as config from '../config';
import Overlay from './overlay';

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
    backgroundImage: 'url(\'https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/13151495_10153419716527676_5289925877114749609_n.jpg?oh=c223b0b53f845c732b18c8de224fa5ea&oe=596C7A0C\')',
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
  shouldComponentUpdate(nextProps) {
    return nextProps.active !== this.props.active;
  }
  render() {
    const { active, themeColor = 'black', toggle, username, userPic } = this.props;
    console.log('userPic', userPic);
    if (!username) {
      return <div />;
    }
    // const isAdmin = props.username === 'warizz' || props.username === 'tob32';
    const isAdmin = true;
    const drawerStyles = active ? { ...styles.drawer.base, ...styles.drawer.active } : { ...styles.drawer.base, ...styles.drawer.inactive };
    const menuItemProps = {
      activeStyle: { ...styles.menuItem.base, ...styles.menuItem.active },
      onClick: toggle,
      style: { ...styles.menuItem.base, ...styles.menuItem.inactive },
    };
    return (
      <div>
        <Overlay active={active} />
        <div style={drawerStyles}>
          <div style={{ ...styles.versionContainer, backgroundColor: themeColor }}>
            <a href="https://github.com/warizz/underground-lottery-on-fire/releases" target="_blank" rel="noopener noreferrer" style={{ color: 'white' }}>
              {`v ${config.appVersion}`}
            </a>
          </div>
          <div style={{ ...styles.userMenuGroup, backgroundColor: themeColor }}>
            <div style={{ ...styles.avatar, marginBottom: '1em' }} />
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
  active: PropTypes.bool,
  themeColor: PropTypes.string,
  toggle: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  userPic: PropTypes.string.isRequired,
};

export default Drawer;
