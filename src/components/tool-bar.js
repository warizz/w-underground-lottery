import React from 'react';
import { PropTypes } from 'prop-types';
import './tool-bar.css';

const ToolBar = ({ pageName }) =>
  (<div className="tool-bar">
    {pageName === 'Home' && <i className="material-icons">home</i>}
    {pageName !== 'Home' &&
      <button className="icon-button" onClick={() => window.history.back()}>
        <i className="material-icons">keyboard_backspace</i>
      </button>}
    {pageName && <span className="page-name">{pageName}</span>}
  </div>);

ToolBar.propTypes = {
  pageName: PropTypes.string,
};

ToolBar.defaultProps = {
  pageName: null,
};

export default ToolBar;
