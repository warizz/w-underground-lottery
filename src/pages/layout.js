import React from 'react';
import { PropTypes } from 'prop-types';
import ToolBar from '../components/tool-bar';
import Overlay from '../components/overlay';
import Snackbar from '../components/snackbar';

const LayoutPage = (props) => {
  const { alert, children, fetching, goBack, pageName, setAlert } = props;
  let childrenElement = null;

  if (children) {
    childrenElement = (
      <div className="content" style={{ marginTop: '50px' }}>
        <Snackbar text={alert} onClose={() => setAlert('')} />
        {children}
      </div>
    );
  }

  return (
    <div className="layout-component">
      <Overlay active={fetching} zIndex={4} text="..." />
      <ToolBar pageName={pageName} backButtonClickedCallback={goBack} />
      {childrenElement}
    </div>
  );
};

LayoutPage.propTypes = {
  alert: PropTypes.string,
  children: PropTypes.node,
  fetching: PropTypes.bool,
  goBack: PropTypes.func,
  pageName: PropTypes.string,
  setAlert: PropTypes.func,
};

LayoutPage.defaultProps = {
  alert: null,
  children: null,
  fetching: false,
  goBack() {},
  pageName: null,
  setAlert() {},
};

export default LayoutPage;
