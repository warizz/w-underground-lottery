import React, { PropTypes } from 'react';
import Link from 'react-router/lib/Link';
import Card from './card';
import './user-profile.css';

const UserProfile = props => (
  <div className="user-profile">
    {!props.user && (
      <Card>
        <div className="placeholder">{'...'}</div>
      </Card>
    )}
    {props.user && (
      <Card>
        <div className="body center">
          <img className="picture" src={props.user.picture} alt="user-profile" role="presentation" />
          <div className="name">{props.user.name}</div>
        </div>
        <div className="action column">
          {props.user.is_admin && <Link to="/dashboard" className="border-bottom">go to admin dashboard</Link>}
          <Link to="/history" className="border-bottom">see history</Link>
          <button onClick={props.logOutHandler}>log out</button>
        </div>
      </Card>
    )}
  </div>
);

UserProfile.propTypes = {
  logOutHandler: PropTypes.func.isRequired,
  user: PropTypes.shape({
    is_admin: PropTypes.bool,
    name: PropTypes.string,
    picture: PropTypes.string,
  }),
};

export default UserProfile;
