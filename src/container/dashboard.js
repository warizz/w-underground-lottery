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
    this.setPaid = this.setPaid.bind(this);
    this.copyToClipboard = this.copyToClipboard.bind(this);
  }
  componentWillMount() {
    this.props.setPageName('Admin dashboard');
  }
  componentDidMount() {
    if (this.props.currentPeriod.id) {
      this.props.service.data.getSummary(this.props.currentPeriod.id).then((res) => {
        this.setState({ summary: res });
      });
    } else {
      this.setPeriod();
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.currentPeriod.id) {
      this.props.service.data.getSummary(nextProps.currentPeriod.id).then((res) => {
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
      this.props.service.data
        .updateBets(periodId, userId, { isPaid })
        .then(() => {
          this.props.service.data
            .getSummary(periodId)
            .then((res) => {
              this.setState({ summary: res });
              self.props.setFetching(false);
            })
            .catch(this.handleError);
        })
        .catch(this.handleError);
    };
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
  copyToClipboard() {
    const textarea = document.createElement('textarea');
    textarea.textContent = document.getElementById('for-clipboard').innerText;
    textarea.style.position = 'fixed';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    this.props.setAlert('copied to clipboard');
  }
  render() {
    return (
      <DashboardPage
        currentPeriod={this.props.currentPeriod}
        closeButtonClickedCallback={this.closePeriod}
        endDate={this.state.endDate}
        endDateChangedCallback={this.onEndDateChange}
        openPeriodClickedCallback={this.openPeriod}
        service={this.props.service}
        setAlert={this.props.setAlert}
        summary={this.state.summary}
        setPaid={this.setPaid}
        copyToClipboard={this.copyToClipboard}
      />
    );
  }
}

const mapStateToProps = state => ({ currentPeriod: state.data.currentPeriod });

DashboardContainer.propTypes = {
  currentPeriod: PropTypes.shape({
    id: PropTypes.string,
  }),
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
    }),
  }).isRequired,
  setAlert: PropTypes.func,
};

DashboardContainer.defaultProps = {
  currentPeriod: {},
  setCurrentPeriod() {},
  setFetching() {},
  setPageName() {},
  setAlert() {},
};

export default connect(mapStateToProps, {
  setAlert: actions.layout.setAlert,
  setCurrentPeriod: actions.data.setCurrentPeriod,
  setFetching: actions.data.setFetching,
  setPageName: actions.layout.setPageName,
})(DashboardContainer);
