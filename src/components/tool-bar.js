import React, { PropTypes } from 'react';

const styles = {
  appName: {
    color: 'white',
    fontSize: '1em',
    fontWeight: 'bold',
    marginLeft: '1em',
  },
  base: {
    alignItems: 'center',
    boxShadow: '0 3px 4px 0 rgba(0,0,0,0.14), 0 3px 3px -2px rgba(0,0,0,0.12), 0 1px 8px 0 rgba(0,0,0,0.2)',
    display: 'flex',
    height: '50px',
    padding: '0 20px',
    position: 'absolute',
    top: 0,
    width: '100%',
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
    const { themeColor = 'black', onClickMenuButton, pageName } = this.props;
    const baseStyle = Object.assign(styles.base, { backgroundColor: themeColor });
    return (
      <div style={baseStyle}>
        <button style={styles.iconButton} onClick={onClickMenuButton}>
          <i style={{ color: 'white' }} className="material-icons">menu</i>
        </button>
        <span style={styles.appName}>{pageName}</span>
      </div>
    );
  }
}

ToolBar.propTypes = {
  onClickMenuButton: PropTypes.func,
  pageName: PropTypes.string,
  themeColor: PropTypes.string,
};

export default ToolBar;
