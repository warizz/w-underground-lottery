import React, { PropTypes } from 'react';
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