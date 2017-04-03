import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { routerShape } from 'react-router';
import ToolBar from '../components/tool-bar';
import Drawer from '../components/drawer';
import action from '../actions/index';
import constants from '../constants/index';
import Overlay from '../components/overlay';
import Snackbar from '../components/snackbar';

const styles = {
  base: {
    width: '100%',
    height: '100%',
  },
  content: {
    height: '100%',
    marginTop: '50px',
    overflowX: 'hidden',
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
    const childrensProps = { username: user.name, isAdmin: user.is_admin, periods, themeColor: constants.color.primary };
    const childrenWithProps = React.cloneElement(this.props.children, childrensProps);
    return (
      <div style={styles.base}>
        <Snackbar active={!!alert} text={alert} onClose={() => setAlert('')} />
        <Overlay active={fetching} zIndex={4} text="..." />
        <ToolBar onClickMenuButton={this.drawerToggle} pageName={this.props.pageName} themeColor={constants.color.primary} />
        <Drawer active={this.state.openDrawer} toggle={this.drawerToggle} username={user.name} themeColor={constants.color.primary} userPic={user.picture} isAdmin={user.is_admin} />
        <div style={styles.content}>
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
  router: routerShape,
  setAlert: PropTypes.func.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired,
    is_admin: PropTypes.bool.isRequired,
  }),
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
