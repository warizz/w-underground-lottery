import React, { PropTypes } from 'react';

const styles = {
  base: {
    display: 'flex',
    margin: '10px 0',
  },
  display: {
    display: 'inline',
    padding: '10px 0',
    width: '200px',
  },
  editButton: {
    marginLeft: '10px',
  },
};

const BetItem = (props) => {
  const handleEditBet = () => {
    const bet = {
      number: props.number,
      price1: props.price1,
      price2: props.price2,
      price3: props.price3,
    };
    props.editHandler(bet);
  };
  return (
    <div style={styles.base}>
      <div style={styles.display}>{`${props.number}: ${props.price1}${props.price2 && ` x ${props.price2}`}${props.price3 ? ` x ${props.price3}` : ''}`}</div>
      <button style={styles.editButton} onClick={handleEditBet}>edit</button>
    </div>
  );
};

BetItem.propTypes = {
  editHandler: PropTypes.func.isRequired,
  number: PropTypes.number.isRequired,
  price1: PropTypes.number.isRequired,
  price2: PropTypes.number.isRequired,
  price3: PropTypes.number.isRequired,
};

export default BetItem;
