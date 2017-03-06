import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { routerShape } from 'react-router';
import ToolBar from '../components/tool-bar';
import Drawer from '../components/drawer';
import * as UserActionCreators from '../actions/user';
import customPropTypes from '../constants/custom-prop-type';
import * as commonStyles from '../constants/styles/common';

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
    // TODO: remove period
    const { fetching, username, periods = [] } = this.props;
    // pass username to content page
    const childrensProps = { username, periods };
    const childrenWithProps = React.cloneElement(this.props.children, childrensProps);
    return (
      <div style={styles.base}>
        <ToolBar onClickMenuButton={this.drawerToggle} pageName={this.props.pageName} />
        <Drawer open={this.state.openDrawer} toggle={this.drawerToggle} username={this.props.username} />
        <div style={styles.content}>
          {fetching && (
            <div style={commonStyles.placeholder}>
              {'fetching...'}
            </div>
          )}
          {!fetching && periods && childrenWithProps}
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
  periods: PropTypes.arrayOf(customPropTypes.periodShape),
  router: routerShape,
  username: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
