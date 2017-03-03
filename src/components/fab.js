import React, { PropTypes } from 'react';
import * as paperShadow from '../constants/styles/paper-shadow';
import * as color from '../constants/styles/color';

const styles = {
  base: {
    backgroundColor: color.primary,
    borderRadius: '50%',
    boxShadow: paperShadow.level3,
    border: 'none',
    color: 'white',
    height: '50px',
    width: '50px',
    position: 'absolute',
    right: '10%',
    transition: 'bottom .5s',
  },
  active: {
    bottom: '10%',
  },
  inactive: {
    bottom: '-20vh',
  },
};

class FAB extends React.Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.active !== this.props.active;
  }
  render() {
    const { active, children, onClick } = this.props;
    const fabStyles = active ? { ...styles.base, ...styles.active } : { ...styles.base, ...styles.inactive };
    return (
      <button style={fabStyles} tabIndex={active ? 0 : -1} onClick={onClick}>
        {children}
      </button>
    );
  }
}

FAB.propTypes = {
  active: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
};

export default FAB;
