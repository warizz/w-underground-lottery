import React, { PropTypes } from 'react';

const styles = {
  base: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '1em',
  },
  six: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontWeight: 'bold',
  },
  two: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontWeight: 'bold',
  },
  three: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    textAlign: 'center',
    width: '100%',
  },
};

const ResultDisplay = props => (
  <div style={styles.base}>
    <h2>ผลรางวัลงวด</h2>
    <h1 style={{ fontWeight: '700' }}>{props.endedAt}</h1>
    <section style={styles.six}>
      <h2>รางวัลที่หนึ่ง</h2>
      <span style={{ fontSize: '50px' }}>{props.six}</span>
    </section>
    <section style={styles.two}>
      <h3>เลขท้ายสองตัว</h3>
      <span style={{ fontSize: '30px' }}>{props.two}</span>
    </section>
    <section style={styles.three}>
      <h3>สามตัวล่าง</h3>
      <div style={{ marginRight: '1em', width: '50%', display: 'flex', justifyContent: 'space-between' }}>
        <span style={{ fontSize: '30px' }}>{props.firstThree}</span>
        <span style={{ fontSize: '30px' }}>{props.secondThree}</span>
      </div>
    </section>
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
