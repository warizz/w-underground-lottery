import React, { PropTypes } from 'react';
import Overlay from './overlay';

const styles = {
  base: {
    display: 'flex',
    justifyContent: 'center',
  },
  closeButton: {
    border: 'none',
    backgroundColor: 'transparent',
  },
  content: {
    base: {
      backgroundColor: 'white',
      width: '80vw',
      position: 'absolute',
      zIndex: 3,
      minHeight: '30vh',
      maxHeight: '80vh',
      overflowX: 'auto',
      transition: 'top .5s',
    },
    active: {
      top: 0,
    },
    inactive: {
      top: '-80vh',
    },
  },
};

class Dialog extends React.Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.active !== this.props.active;
  }
  render() {
    const { active, children, toggle } = this.props;
    const contentStyle = active ? { ...styles.content.base, ...styles.content.active } : { ...styles.content.base, ...styles.content.inactive };
    return (
      <div style={styles.base}>
        <Overlay active={active} />
        <div style={contentStyle}>
          {children}
          <button style={styles.closeButton} onClick={toggle}>
            <i className="material-icons">close</i>
          </button>
        </div>
      </div>
    );
  }
}

Dialog.propTypes = {
  active: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  toggle: PropTypes.func.isRequired,
};

export default Dialog;
