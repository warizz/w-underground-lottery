import React, { PropTypes } from 'react';
import * as paperShadow from '../constants/styles/paper-shadow';

const styles = {
  base: {
    display: 'flex',
    height: '3em',
    justifyContent: 'center',
    left: 0,
    padding: '0 1em',
    position: 'fixed',
    right: 0,
    transition: 'bottom .3s',
    width: '100%',
  },
  active: {
    bottom: '1em',
  },
  inactive: {
    bottom: '-3em',
  },
  snackbar: {
    alignItems: 'center',
    backgroundColor: 'black',
    boxShadow: paperShadow.level2,
    color: 'orange',
    display: 'flex',
    height: '100%',
    paddingLeft: '1em',
    width: '300px',
  },
};

const Snackbar = (props) => {
  const baseStyle = props.active ? { ...styles.base, ...styles.active } : { ...styles.base, ...styles.inactive };
  return (
    <div style={baseStyle}>
      <div style={styles.snackbar}>
        {props.text}
      </div>
    </div>
  );
};

Snackbar.propTypes = {
  text: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
};

export default Snackbar;
