import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import actions from '../actions/index';
import service from '../services/index';
import DashboardPage from '../pages/dashboard';

class DashboardContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      endDate: moment().format('YYYY-MM-DD'),
    };
    this.openPeriod = this.openPeriod.bind(this);
    this.closePeriod = this.closePeriod.bind(this);
    this.setPeriod = this.setPeriod.bind(this);
    this.onEndDateChange = this.onEndDateChange.bind(this);
  }
  componentWillMount() {
    this.props.setPageName('Admin dashboard');
  }
  onEndDateChange(e) {
    this.setState({ endDate: e.target.value });
  }
  setPeriod() {
    service.data.getCurrentPeriod().then((res) => {
      this.props.setCurrentPeriod(res);
      this.props.setFetching(false);
    });
  }
  openPeriod() {
    this.props.setFetching(true);
    const endedAt = new Date(this.state.endDate);
    service.data.openPeriod(endedAt).then(this.setPeriod);
  }
  closePeriod() {
    this.props.setFetching(true);
    const { id } = this.props.currentPeriod;
    service.data.updatePeriod(id, { isOpen: false }).then(this.setPeriod);
  }
  render() {
    return <DashboardPage {...this.props} closeButtonClickedCallback={this.closePeriod} endDateChangedCallback={this.onEndDateChange} />;
  }
}

const mapStateToProps = state => ({ currentPeriod: state.data.currentPeriod });

const mapDispatchToProps = dispatch => ({
  setCurrentPeriod: currentPeriod => dispatch(actions.data.setCurrentPeriod(currentPeriod)),
  setFetching: fetching => dispatch(actions.data.setFetching(fetching)),
  setPageName: pageName => dispatch(actions.layout.setPageName(pageName)),
});

DashboardContainer.propTypes = {
  currentPeriod: PropTypes.shape({
    id: PropTypes.string,
  }),
  setCurrentPeriod: PropTypes.func,
  setFetching: PropTypes.func,
  setPageName: PropTypes.func,
};

DashboardContainer.defaultProps = {
  currentPeriod: {},
  setCurrentPeriod() {},
  setFetching() {},
  setPageName() {},
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer);
