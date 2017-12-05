import React from 'react';
import PropTypes from 'prop-types';
import Link from 'react-router/lib/Link';
import Card from './Card';
import './user-profile.css';

const UserProfile = props => {
  let body;

  if (props.user) {
    let dashboardLink;

    if (props.user.is_admin) {
      dashboardLink = (
        <Link className='border-bottom' to='/dashboard'>
          go to admin dashboard
        </Link>
      );
    } else {
      dashboardLink = null;
    }

    body = (
      <Card>
        <div className='body center'>
          <img
            alt='user-profile'
            className='picture'
            role='presentation'
            src={props.user.picture}
          />
          <div className='name'>{props.user.name}</div>
        </div>
        <div className='action column'>
          {dashboardLink}
          <Link className='border-bottom' to='/history'>
            see history
          </Link>
          <button onClick={props.logOutHandler}>log out</button>
        </div>
      </Card>
    );
  } else {
    body = (
      <Card>
        <div className='placeholder'>{'...'}</div>
      </Card>
    );
  }

  return <div className='user-profile'>{body}</div>;
};

UserProfile.propTypes = {
  logOutHandler: PropTypes.func.isRequired,
  user: PropTypes.shape({
    is_admin: PropTypes.bool,
    name: PropTypes.string,
    picture: PropTypes.string,
  }),
};

UserProfile.defaultProps = {
  logOutHandler() {},
  user: null,
};

export default UserProfile;
