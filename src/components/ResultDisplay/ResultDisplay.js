import React from 'react';
import PropTypes from 'prop-types';
import './ResultDisplay.css';
import { Segment } from 'semantic-ui-react';

const ResultDisplay = ({
  six,
  two,
  firstThree,
  secondThree,
  thirdThree,
  fourthThree,
}) => {
  return (
    <Segment.Group className="ResultDisplay" size="massive">
      <Segment color="green" textAlign="center">
        {six}
      </Segment>
      <Segment textAlign="center">{two}</Segment>
      <Segment.Group horizontal>
        <Segment textAlign="center">{firstThree}</Segment>
        <Segment textAlign="center">{secondThree}</Segment>
      </Segment.Group>
      <Segment.Group horizontal>
        <Segment textAlign="center">{thirdThree}</Segment>
        <Segment textAlign="center">{fourthThree}</Segment>
      </Segment.Group>
    </Segment.Group>
  );
};

ResultDisplay.propTypes = {
  firstThree: PropTypes.string,
  fourthThree: PropTypes.string,
  secondThree: PropTypes.string,
  six: PropTypes.string,
  thirdThree: PropTypes.string,
  two: PropTypes.string,
};

ResultDisplay.defaultProps = {
  firstThree: '-',
  fourthThree: '-',
  secondThree: '-',
  six: '-',
  thirdThree: '-',
  two: '-',
};

export default ResultDisplay;
