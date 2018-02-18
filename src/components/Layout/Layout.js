import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';

import action from '../../actions/index';
import Toolbar from '../../components/Toolbar';
import Snackbar from '../../components/snackbar';

const Placeholder = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const Content = styled.div`
  margin: 50px 0 0 0;
`;

class Layout extends React.Component {
  state = {
    isFetchingInitialData: false,
  };

  componentDidMount() {
    this.fetchInitialData();
  }

  fetchInitialData = async () => {
    if (this.props.user) {
      return;
    }

    this.setState({ isFetchingInitialData: true });

    try {
      const values = await Promise.all([
        this.props.proxy.getUser(),
        this.props.proxy.getCurrentPeriod(),
      ]);

      const [user, currentPeriod] = values;

      this.props.setUser(user);
      this.props.setCurrentPeriod(currentPeriod);
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          this.props.cookieManager.removeToken();
          this.props.router.push('/log-in');
        }
      }
    } finally {
      this.setState({ isFetchingInitialData: false });
    }
  };

  closeSnackbar = () => this.props.setAlert('');

  render() {
    if (this.state.isFetchingInitialData) {
      return (
        <Placeholder>
          <h1>Initiating your data ...</h1>
        </Placeholder>
      );
    }

    return (
      <div>
        <Toolbar
          onClickMainButton={this.props.router.goBack}
          pageName={this.props.pageName}
        />
        {this.props.children && (
          <Content>
            <Snackbar onClose={this.closeSnackbar} text={this.props.alert} />
            {this.props.children}
          </Content>
        )}
      </div>
    );
  }
}

Layout.propTypes = {
  alert: PropTypes.string,
  children: PropTypes.node,
  cookieManager: PropTypes.shape({
    removeToken: PropTypes.func,
  }),
  pageName: PropTypes.string,
  proxy: PropTypes.shape({
    getCurrentPeriod: PropTypes.func,
    getUser: PropTypes.func,
  }),
  router: PropTypes.shape({
    goBack: PropTypes.func,
    push: PropTypes.func,
  }),
  setAlert: PropTypes.func,
  setCurrentPeriod: PropTypes.func,
  setUser: PropTypes.func,
  user: PropTypes.shape({}),
};

Layout.defaultProps = {
  alert: '',
  children: null,
  cookieManager: {
    removeToken() {},
  },
  pageName: '',
  proxy: {
    getCurrentPeriod() {},
    getUser() {},
  },
  router: {
    goBack() {},
    push() {},
  },
  setAlert() {},
  setCurrentPeriod() {},
  setUser() {},
  user: null,
};

const mapStateToProps = state => ({
  alert: state.layout.alert,
  pageName: state.layout.pageName,
  user: state.user.user,
});

export { Layout };

export default connect(mapStateToProps, {
  setAlert: action.layout.setAlert,
  setCurrentPeriod: action.data.setCurrentPeriod,
  setUser: action.user.setUser,
})(Layout);
