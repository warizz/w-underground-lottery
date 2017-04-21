import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import ToolBar from '../components/tool-bar';
import Overlay from '../components/overlay';
import Snackbar from '../components/snackbar';

import action from '../actions/index';

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
    const { alert, fetching, setAlert } = this.props;
    return (
      <div>
        <Overlay active={fetching} zIndex={4} text="..." />
        <ToolBar pageName={this.props.pageName} />
        <div style={styles.content}>
          <Snackbar text={alert} onClose={() => setAlert('')} />
          {this.props.children}
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
  setAlert: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
