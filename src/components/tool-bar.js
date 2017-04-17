import React, { PropTypes } from 'react';

const styles = {
  appName: {
    fontSize: '1em',
    fontWeight: 'bold',
    marginLeft: '1em',
  },
  base: {
    alignItems: 'center',
    backgroundColor: '#E9EBEE',
    display: 'flex',
    height: '50px',
    padding: '0 20px',
    position: 'absolute',
    top: 0,
    width: '100%',
    zIndex: 1,
    opacity: '0.8',
  },
  iconButton: {
    backgroundColor: 'transparent',
    border: 'none',
    display: 'flex',
    padding: '0',
  },
};

class ToolBar extends React.Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.pageName !== this.props.pageName;
  }
  render() {
    const { pageName } = this.props;
    return (
      <div style={styles.base}>
        {pageName === 'Home' && (
          <i className="material-icons">home</i>
        )}
        {pageName !== 'Home' && (
          <button style={styles.iconButton} onClick={() => history.back()}>
            <i className="material-icons">keyboard_backspace</i>
          </button>
        )}
        <span style={styles.appName}>{pageName}</span>
      </div>
    );
  }
}

ToolBar.propTypes = {
  pageName: PropTypes.string,
};

export default ToolBar;
