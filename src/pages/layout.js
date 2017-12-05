import React from 'react';
import PropTypes from 'prop-types';
import Toolbar from '../components/Toolbar';
import Snackbar from '../components/snackbar';

const LayoutPage = props => {
  const { alert, children, goBack, pageName, setAlert } = props;
  let childrenElement = null;

  if (children) {
    childrenElement = (
      <div className='content' style={{ marginTop: '50px' }}>
        <Snackbar onClose={() => setAlert('')} text={alert} />
        {children}
      </div>
    );
  }

  return (
    <div className='layout-component'>
      <Toolbar onClickMainButton={goBack} pageName={pageName} />
      {childrenElement}
    </div>
  );
};

LayoutPage.propTypes = {
  alert: PropTypes.string,
  children: PropTypes.node,
  goBack: PropTypes.func,
  pageName: PropTypes.string,
  setAlert: PropTypes.func,
};

LayoutPage.defaultProps = {
  alert: null,
  children: null,
  goBack() {},
  pageName: null,
  setAlert() {},
};

export default LayoutPage;
