import React, { PropTypes } from 'react';
import './result-display.css';

const ResultDisplay = props => (
  <div className="result-display">
    <div className="title">{props.endedAt}</div>
    <div className="body">
      <div className="row">
        <div className="result-group">
          <h2>รางวัลที่หนึ่ง</h2>
          <span style={{ fontSize: '50px' }}>{props.six}</span>
        </div>
      </div>
      <div className="row">
        <div className="result-group">
          <h3>เลขท้ายสองตัว</h3>
          <span style={{ fontSize: '30px' }}>{props.two}</span>
        </div>
      </div>
      <div className="row">
        <div className="result-group">
          <h3>สามตัวล่าง</h3>
          <div className="three">
            <span style={{ fontSize: '30px' }}>{props.firstThree}</span>
            <span style={{ fontSize: '30px' }}>{props.secondThree}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

ResultDisplay.propTypes = {
  six: PropTypes.string.isRequired,
  two: PropTypes.string.isRequired,
  firstThree: PropTypes.string.isRequired,
  secondThree: PropTypes.string.isRequired,
  endedAt: PropTypes.string.isRequired,
};

export default ResultDisplay;
