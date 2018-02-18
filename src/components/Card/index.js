// @flow
import * as React from 'react';
import './Card.css';

type Props = {
  children: React.Node,
};

const Card = (props: Props) => {
  const { children } = props;
  return <div className="card-component">{children}</div>;
};

export default Card;
