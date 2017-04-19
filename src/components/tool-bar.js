import React, { PropTypes } from 'react';
import './tool-bar.css';

class ToolBar extends React.Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.pageName !== this.props.pageName;
  }
  render() {
    const { pageName } = this.props;
    return (
      <div className="tool-bar">
        {pageName === 'Home' && (
          <i className="material-icons">home</i>
        )}
        {pageName !== 'Home' && (
          <button className="icon-button" onClick={() => history.back()}>
            <i className="material-icons">keyboard_backspace</i>
          </button>
        )}
        <span className="page-name">{pageName}</span>
      </div>
    );
  }
}

ToolBar.propTypes = {
  pageName: PropTypes.string,
};

export default ToolBar;
