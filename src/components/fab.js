import React, { PropTypes } from 'react';

const styles = {
  container: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    bottom: '10%',
    display: 'flex',
    height: '50px',
    justifyContent: 'center',
    width: '50px',
    position: 'absolute',
    right: '10%',
  },
  base: {
    boxShadow: 'rgba(0, 0, 0, 0.156863) 0px 3px 10px, rgba(0, 0, 0, 0.227451) 0px 3px 10px', // http://www.material-ui.com/#/components/floating-action-button
    border: 'none',
    borderRadius: '100%',
    color: 'white',
    transition: 'all .5s',
  },
  active: {
    height: '50px',
    opacity: 1,
    visibility: 'visible',
    width: '50px',
  },
  inactive: {
    height: 0,
    opacity: 0,
    visibility: 'hidden',
    width: 0,
  },
};

class FAB extends React.Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.active !== this.props.active;
  }
  render() {
    const { active, children, onClick, themeColor = 'black' } = this.props;
    const baseStyle = { ...styles.base, backgroundColor: themeColor };
    const fabStyles = active ? { ...baseStyle, ...styles.active } : { ...baseStyle, ...styles.inactive };
    return (
      <div style={{ ...styles.container, zIndex: active ? 'inherit' : -1 }}>
        <button style={fabStyles} tabIndex={active ? 0 : -1} onClick={onClick}>
          {children}
        </button>
      </div>
    );
  }
}

FAB.propTypes = {
  active: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  themeColor: PropTypes.string,
};

export default FAB;
