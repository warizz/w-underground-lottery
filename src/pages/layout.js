import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { routerShape } from 'react-router';
import ToolBar from '../components/tool-bar';
import Drawer from '../components/drawer';
import * as UserActionCreators from '../actions/user';
import constants from '../constants/index';
import Overlay from '../components/overlay';

const styles = {
  base: {
    width: '100%',
  },
  content: {
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
  componentDidMount() {
    if (!this.props.username) {
      this.props.router.push('/sign-in');
    }
  }
  drawerToggle() {
    this.setState({ openDrawer: !this.state.openDrawer });
  }
  render() {
    const { fetching, periods = [], userPic, username } = this.props;
    // pass username to content page
    const childrensProps = { username, periods, themeColor: constants.color.primary };
    const childrenWithProps = React.cloneElement(this.props.children, childrensProps);
    return (
      <div style={styles.base}>
        <Overlay active={fetching} zIndex={4} text="loading..." />
        <ToolBar onClickMenuButton={this.drawerToggle} pageName={this.props.pageName} themeColor={constants.color.primary} />
        <Drawer active={this.state.openDrawer} toggle={this.drawerToggle} username={this.props.username} themeColor={constants.color.primary} userPic={userPic} />
        <div style={styles.content}>
          {periods && childrenWithProps}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => (
  {
    fetching: state.data.fetching,
    pageName: state.layout.pageName,
    periods: state.data.periods,
    userPic: state.user.pic,
    username: state.user.username,
  }
);

const mapDispatchToProps = dispatch => (
  bindActionCreators({ ...UserActionCreators }, dispatch)
);

Layout.propTypes = {
  children: PropTypes.node,
  fetching: PropTypes.bool.isRequired,
  pageName: PropTypes.string,
  periods: PropTypes.arrayOf(constants.customPropType.periodShape),
  userPic: PropTypes.string.isRequired,
  router: routerShape,
  username: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
