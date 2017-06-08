import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import actions from '../actions/index';
import service from '../services/index';
import SummaryPage from '../pages/summary';

export class SummaryContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      period: '',
      processingUser: '',
    };
    this.copyToClipboard = this.copyToClipboard.bind(this);
    this.handleError = this.handleError.bind(this);
  }
  componentDidMount() {
    if (this.props.currentPeriod) {
      service.data.getSummary(this.props.currentPeriod.id).then((res) => {
        this.setState({ summary: res });
      });
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.currentPeriod) {
      service.data.getSummary(nextProps.currentPeriod.id).then((res) => {
        this.setState({ summary: res });
      });
    }
  }
  setPaid(periodId, userId, isPaid) {
    const self = this;
    return () => {
      self.props.setFetching(true);
      service.data
        .updateBets(periodId, userId, { isPaid })
        .then(() => {
          service.data
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
  handleError(error) {
    const alertText = `${error.response.status}: ${error.response.statusText}`;
    this.props.setAlert(alertText);
    this.props.setFetching(false);
  }
  render() {
    return <SummaryPage {...this.props} />;
  }
}

const mapStateToProps = state => ({ currentPeriod: state.data.currentPeriod });

SummaryContainer.propTypes = {
  currentPeriod: PropTypes.shape({
    id: PropTypes.string,
  }),
  setAlert: PropTypes.func.isRequired,
  setFetching: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, {
  setAlert: actions.layout.setAlert,
  setFetching: actions.data.setFetching,
})(SummaryContainer);
