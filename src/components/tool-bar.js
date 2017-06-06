import React from 'react';
import { PropTypes } from 'prop-types';
import './tool-bar.css';

const ToolBar = (props) => {
  const { backButtonClickedCallback, pageName } = props;
  let elementIcon = null;
  let elementBackButton = null;
  let elementPageName = null;

  if (pageName && pageName.toLowerCase() === 'home') {
    elementIcon = <i className="material-icons">home</i>;
  }

  if (!pageName || pageName.toLowerCase() !== 'home') {
    elementBackButton = (
      <button className="icon-button back" onClick={backButtonClickedCallback}>
        <i className="material-icons">keyboard_backspace</i>
      </button>
    );
  }

  if (pageName) {
    elementPageName = <span className="page-name">{pageName}</span>;
  }

  return (
    <div className="tool-bar">
      {elementIcon}
      {elementBackButton}
      {elementPageName}
    </div>
  );
};

ToolBar.propTypes = {
  backButtonClickedCallback: PropTypes.func,
  pageName: PropTypes.string,
};

ToolBar.defaultProps = {
  backButtonClickedCallback() {},
  pageName: null,
};

export default ToolBar;
