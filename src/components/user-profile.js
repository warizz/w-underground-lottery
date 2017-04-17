import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import './user-profile.css';

const UserProfile = props => (
  <div className="user-profile">
    <div className="detail">
      <img className="picture" src={props.pictureUrl} alt="user-profile" role="presentation" />
      <div className="name">{props.name}</div>
    </div>
    <div className="action">
      {props.isAdmin && <Link to="/dashboard" className="button">go to admin dashboard</Link>}
      <Link to="/history" className="button">see history</Link>
      <button className="button" onClick={props.logOutHandler}>log out</button>
    </div>
  </div>
);

UserProfile.propTypes = {
  isAdmin: PropTypes.bool,
  logOutHandler: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  pictureUrl: PropTypes.string.isRequired,
};

export default UserProfile;
