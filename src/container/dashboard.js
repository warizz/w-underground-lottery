import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import actions from '../actions/index';
import DashboardPage from '../pages/dashboard';

export class DashboardContainer extends React.Component {
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
    this.props.service.data.getCurrentPeriod().then((res) => {
      this.props.setCurrentPeriod(res);
      this.props.setFetching(false);
    });
  }
  openPeriod(endDate) {
    const endedAt = new Date(endDate);

    this.props.setFetching(true);
    this.props.service.data.openPeriod(endedAt).then(() => {
      this.setPeriod();
    });
  }
  closePeriod(id) {
    this.props.setFetching(true);
    this.props.service.data.updatePeriod(id, { isOpen: false }).then(() => {
      this.setPeriod();
    });
  }
  render() {
    return (
      <DashboardPage
        currentPeriod={this.props.currentPeriod}
        closeButtonClickedCallback={this.closePeriod}
        endDate={this.state.endDate}
        endDateChangedCallback={this.onEndDateChange}
        openPeriodClickedCallback={this.openPeriod}
      />
    );
  }
}

const mapStateToProps = state => ({ currentPeriod: state.data.currentPeriod });

DashboardContainer.propTypes = {
  currentPeriod: PropTypes.shape({}),
  setCurrentPeriod: PropTypes.func,
  setFetching: PropTypes.func,
  setPageName: PropTypes.func,
  service: PropTypes.shape({
    data: PropTypes.shape({
      getCurrentPeriod: PropTypes.func,
      openPeriod: PropTypes.func,
      updatePeriod: PropTypes.func,
    }),
  }).isRequired,
};

DashboardContainer.defaultProps = {
  currentPeriod: {},
  setCurrentPeriod() {},
  setFetching() {},
  setPageName() {},
};

export default connect(mapStateToProps, {
  setCurrentPeriod: actions.data.setCurrentPeriod,
  setFetching: actions.data.setFetching,
  setPageName: actions.layout.setPageName,
})(DashboardContainer);
