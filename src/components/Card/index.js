// @flow
import * as React from 'react';
import './Card.css';

type Props = {
  children: React.Node
};

const Card = (props: Props) => {
  const { children } = props;
  return (
    <div className="card-component" tabIndex={0}>
      {children}
    </div>
  );
};

export default Card;
