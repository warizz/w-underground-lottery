import React, { PropTypes } from 'react';
import * as color from '../constants/styles/color';
import * as paperShadow from '../constants/styles/paper-shadow';

const styles = {
  appName: {
    color: 'white',
    fontSize: '1em',
    fontWeight: 'bold',
    marginLeft: '1em',
  },
  base: {
    alignItems: 'center',
    backgroundColor: color.primary,
    boxShadow: paperShadow.level2,
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
    const { onClickMenuButton, pageName } = this.props;
    return (
      <div style={styles.base}>
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
};

export default ToolBar;
