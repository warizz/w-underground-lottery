import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const style = {
  container: {
    position: 'relative',
    backgroundColor: 'white',
    height: '100%',
    width: '300px',
    maxWidth: '300px',
    border: '1px solid #b8bfc3',
    borderRadius: '5px',
    overflow: 'hidden',
  },
  detail: {
    container: {
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'column',
      padding: '10px',
    },
    picture: {
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
    name: {
      fontWeight: 'bold',
      margin: '10px 0 0 0',
    },
  },
  action: {
    container: {
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: 'rgb(246, 247, 249)',
    },
    button: {
      width: '100%',
      backgroundColor: 'transparent',
      border: 'none',
      borderTop: '1px solid rgb(184, 191, 195)',
      padding: '10px',
      fontWeight: 'bold',
      color: 'rgb(148, 146, 146)',
      textAlign: 'center',
    },
  },
};

const UserProfile = props => (
  <div style={style.container}>
    <div style={style.detail.container}>
      <div style={{ ...style.detail.picture, backgroundImage: `url(${props.pictureUrl})` }} />
      <div style={style.detail.name}>{props.name}</div>
    </div>
    <div style={style.action.container}>
      {props.isAdmin && (
        <Link to="/dashboard" style={style.action.button}>go to admin dashboard</Link>
      )}
      <Link to="/history" style={style.action.button}>see history</Link>
      <button style={style.action.button}>log out</button>
    </div>
  </div>
);

UserProfile.propTypes = {
  isAdmin: PropTypes.bool,
  pictureUrl: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default UserProfile;
