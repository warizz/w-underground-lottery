import React from 'react';
import PropTypes from 'prop-types';
import Link from 'react-router/lib/Link';
import { Card, Image } from 'semantic-ui-react';
import './UserProfile.css';

const UserProfile = ({ onLogOut, user }) => {
  if (!user) {
    return null;
  }

  return (
    <Card className='UserProfile' fluid>
      <Card.Content>
        <Image circular floated='left' size='mini' src={user.picture} />
        <Card.Header>{user.name}</Card.Header>
        <Card.Meta>{user.is_admin ? 'Admin' : 'User'}</Card.Meta>
      </Card.Content>
      {user.is_admin && (
        <Card.Content extra>
          <Link to='/dashboard'>Go to admin dashboard</Link>
        </Card.Content>
      )}
      <Card.Content extra>
        <Link to='/history'>See history</Link>
      </Card.Content>
      <Card.Content extra>
        <button onClick={onLogOut}>Log out</button>
      </Card.Content>
    </Card>
  );
};

UserProfile.propTypes = {
  onLogOut: PropTypes.func.isRequired,
  user: PropTypes.shape({
    is_admin: PropTypes.bool,
    name: PropTypes.string,
    picture: PropTypes.string,
  }),
};

UserProfile.defaultProps = {
  onLogOut() {},
  user: null,
};

export default UserProfile;
