import React from 'react';
import { PropTypes } from 'prop-types';
import Link from 'react-router/lib/Link';
import Card from './card';
import './user-profile.css';

const UserProfile = (props) => {
  let body;

  if (props.user) {
    let dashboardLink;

    if (props.user.is_admin) {
      dashboardLink = <Link to="/dashboard" className="border-bottom">go to admin dashboard</Link>;
    } else {
      dashboardLink = null;
    }

    body = (
      <Card>
        <div className="body center">
          <img className="picture" src={props.user.picture} alt="user-profile" role="presentation" />
          <div className="name">{props.user.name}</div>
        </div>
        <div className="action column">
          {dashboardLink}
          <Link to="/history" className="border-bottom">see history</Link>
          <button onClick={props.logOutHandler}>log out</button>
        </div>
      </Card>
    );
  } else {
    body = (
      <Card>
        <div className="placeholder">{'...'}</div>
      </Card>
    );
  }

  return (
    <div className="user-profile">
      {body}
    </div>
  );
};

UserProfile.propTypes = {
  logOutHandler: PropTypes.func.isRequired,
  user: PropTypes.shape({
    is_admin: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired,
  }),
};

UserProfile.defaultProps = {
  logOutHandler() {},
  user: null,
};

export default UserProfile;
