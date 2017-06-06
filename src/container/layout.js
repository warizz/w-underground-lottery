import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import action from '../actions/index';
import LayoutPage from '../pages/layout';

const LayoutContainer = props => <LayoutPage {...props} goBack={browserHistory.goBack} />;

const mapStateToProps = state => ({
  alert: state.layout.alert,
  fetching: state.data.fetching,
  pageName: state.layout.pageName,
  user: state.user.user,
});

export default connect(mapStateToProps, { setAlert: action.layout.setAlert })(LayoutContainer);
