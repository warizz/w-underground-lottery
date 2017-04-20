import React, { PropTypes } from 'react';
import Link from 'react-router/lib/Link';
import Card from './card';
import './user-profile.css';

const UserProfile = props => (
  <div className="user-profile">
    <Card>
      <div className="body center">
        <img className="picture" src={props.pictureUrl} alt="user-profile" role="presentation" />
        <div className="name">{props.name}</div>
      </div>
      <div className="action column">
        {props.isAdmin && <Link to="/dashboard" className="border-bottom">go to admin dashboard</Link>}
        <Link to="/history" className="border-bottom">see history</Link>
        <button onClick={props.logOutHandler}>log out</button>
      </div>
    </Card>
  </div>
);

UserProfile.propTypes = {
  isAdmin: PropTypes.bool,
  logOutHandler: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  pictureUrl: PropTypes.string.isRequired,
};

export default UserProfile;
