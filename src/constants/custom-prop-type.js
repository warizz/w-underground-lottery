import { PropTypes } from 'react';

const betShape = PropTypes.shape({
  createdAt: PropTypes.instanceOf(Date),
  createdBy: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  price1: PropTypes.number,
  price2: PropTypes.number,
  price3: PropTypes.number,
});

const resultShape = PropTypes.shape({
  six: PropTypes.string,
  two: PropTypes.string,
  firstThree: PropTypes.string,
  secondThree: PropTypes.string,
});

const periodShape = PropTypes.shape({
  bets: PropTypes.arrayOf(betShape),
  id: PropTypes.string,
  endDate: PropTypes.instanceOf(Date),
  open: PropTypes.bool,
  result: resultShape,
});

export default {
  betShape,
  periodShape,
};
