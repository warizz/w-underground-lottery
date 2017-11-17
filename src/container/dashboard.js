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
      isUpdatingResult: false,
    };
    this.openPeriod = this.openPeriod.bind(this);
    this.closePeriod = this.closePeriod.bind(this);
    this.setPeriod = this.setPeriod.bind(this);
    this.onEndDateChange = this.onEndDateChange.bind(this);
    this.setPaid = this.setPaid.bind(this);
  }
  componentWillMount() {
    this.props.setPageName('Admin dashboard');
  }
  componentDidMount() {
    if (this.props.currentPeriod.id) {
      return this.props.service.data.getSummary(this.props.currentPeriod.id).then(res => {
        this.setState({ summary: res });
      });
    }
    return this.setPeriod();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.currentPeriod.id) {
      this.props.service.data.getSummary(nextProps.currentPeriod.id).then(res => {
        this.setState({ summary: res });
      });
    }
  }
  onEndDateChange(e) {
    this.setState({ endDate: e.target.value });
  }
  setPaid(periodId, userId, isPaid) {
    const self = this;
    return () => {
      self.props.setFetching(true);
      return this.props.service.data.updateBets(periodId, userId, { isPaid }).then(() => {
        this.props.service.data.getSummary(periodId).then(res => {
          this.setState({ summary: res });
          self.props.setFetching(false);
        });
      });
    };
  }
  setPeriod() {
    return this.props.service.data
      .getCurrentPeriod()
      .then(res => this.props.setCurrentPeriod(res))
      .then(() => this.props.setFetching(false));
  }
  openPeriod(endDate) {
    const endedAt = new Date(endDate);

    this.props.setFetching(true);
    return this.props.service.data.openPeriod(endedAt).then(this.setPeriod);
  }
  closePeriod(id) {
    this.props.setFetching(true);
    return this.props.service.data.updatePeriod(id, { isOpen: false }).then(this.setPeriod);
  }
  updateResult = () => {
    this.setState({ isUpdatingResult: true });
    return this.props.service.data
      .updateResult()
      .then(() => this.setState({ isUpdatingResult: false }));
  };
  render() {
    return (
      <DashboardPage
        closeButtonClickedCallback={this.closePeriod}
        currentPeriod={this.props.currentPeriod}
        endDate={this.state.endDate}
        endDateChangedCallback={this.onEndDateChange}
        isUpdatingResult={this.state.isUpdatingResult}
        openPeriodClickedCallback={this.openPeriod}
        service={this.props.service}
        setAlert={this.props.setAlert}
        setPaid={this.setPaid}
        summary={this.state.summary}
        updateResultClickedCallback={this.updateResult}
      />
    );
  }
}

const mapStateToProps = state => ({ currentPeriod: state.data.currentPeriod });

DashboardContainer.propTypes = {
  currentPeriod: PropTypes.shape({ id: PropTypes.string }),
  setCurrentPeriod: PropTypes.func,
  setFetching: PropTypes.func,
  setPageName: PropTypes.func,
  service: PropTypes.shape({
    data: PropTypes.shape({
      getCurrentPeriod: PropTypes.func,
      openPeriod: PropTypes.func,
      updatePeriod: PropTypes.func,
      updateBets: PropTypes.func,
      getSummary: PropTypes.func,
      updateResult: PropTypes.func,
    }),
  }),
  setAlert: PropTypes.func,
};

DashboardContainer.defaultProps = {
  currentPeriod: {},
  setCurrentPeriod() {},
  setFetching() {},
  setPageName() {},
  setAlert() {},
  service: {
    data: {
      getCurrentPeriod: async () => {},
      openPeriod: async () => {},
      updatePeriod: async () => {},
      getSummary: async () => {},
      updateBets: async () => {},
      updateResult: async () => {},
    },
  },
};

export default connect(mapStateToProps, {
  setAlert: actions.layout.setAlert,
  setCurrentPeriod: actions.data.setCurrentPeriod,
  setFetching: actions.data.setFetching,
  setPageName: actions.layout.setPageName,
})(DashboardContainer);
