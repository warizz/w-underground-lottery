import React, { PropTypes } from 'react';

const styles = {
  base: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    height: '100vh',
    left: '0',
    position: 'absolute',
    top: '0',
    width: '100%',
    transition: 'opacity .5s',
    zIndex: 1,
  },
  active: {
    top: 0,
    opacity: 1,
  },
  inactive: {
    top: '-100vh',
    opacity: 0,
  },
};

class Overlay extends React.Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.active !== this.props.active;
  }
  render() {
    const { active, clickHandler } = this.props;
    const style = active ? { ...styles.base, ...styles.active } : { ...styles.base, ...styles.inactive };
    return (
      <div onClick={clickHandler} style={style}>&nbsp;</div>
    );
  }
}

Overlay.propTypes = {
  active: PropTypes.bool.isRequired,
  clickHandler: PropTypes.func,
};

export default Overlay;
