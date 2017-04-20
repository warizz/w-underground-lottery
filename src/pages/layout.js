import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import ToolBar from '../components/tool-bar';
import Overlay from '../components/overlay';
import Snackbar from '../components/snackbar';

import action from '../actions/index';
import constants from '../constants/index';

const styles = {
  content: {
    marginTop: '50px',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
};

class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openDrawer: false,
    };
    this.drawerToggle = this.drawerToggle.bind(this);
  }
  drawerToggle() {
    this.setState({ openDrawer: !this.state.openDrawer });
  }
  render() {
    const { alert, fetching, periods = [], setAlert, user } = this.props;
    if (!user) return null;
    // pass username to content page
    const childrensProps = { user, isAdmin: user.is_admin, periods, themeColor: constants.color.primary };
    const childrenWithProps = React.cloneElement(this.props.children, childrensProps);
    return (
      <div>
        <Overlay active={fetching} zIndex={4} text="..." />
        <ToolBar pageName={this.props.pageName} />
        <div style={styles.content}>
          <Snackbar text={alert} onClose={() => setAlert('')} />
          {periods && childrenWithProps}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => (
  {
    alert: state.layout.alert,
    fetching: state.data.fetching,
    pageName: state.layout.pageName,
    periods: state.data.periods,
    user: state.user.user,
  }
);

const mapDispatchToProps = dispatch => (
  {
    setAlert: alert => dispatch(action.layout.setAlert(alert)),
  }
);

Layout.propTypes = {
  alert: PropTypes.string,
  children: PropTypes.node,
  fetching: PropTypes.bool.isRequired,
  pageName: PropTypes.string,
  periods: PropTypes.arrayOf(constants.customPropType.periodShape),
  setAlert: PropTypes.func.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired,
    is_admin: PropTypes.bool.isRequired,
  }),
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
