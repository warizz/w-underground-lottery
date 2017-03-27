import React, { PropTypes } from 'react';

const styles = {
  base: {
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    color: 'white',
    display: 'flex',
    fontSize: '20px',
    fontWeight: 'bold',
    height: '100vh',
    justifyContent: 'center',
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
    const { active, clickHandler, text } = this.props;
    const style = active ? { ...styles.base, ...styles.active } : { ...styles.base, ...styles.inactive };
    return (
      <div onClick={clickHandler} style={style}>{text || ''}</div>
    );
  }
}

Overlay.propTypes = {
  active: PropTypes.bool.isRequired,
  clickHandler: PropTypes.func,
  text: PropTypes.string,
};

export default Overlay;
