import React from 'react';
import { PropTypes } from 'prop-types';
import './card.css';

const Card = (props) => {
  const { children } = props;
  return (
    <div className="card-component" tabIndex={0}>
      {children}
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Card;
