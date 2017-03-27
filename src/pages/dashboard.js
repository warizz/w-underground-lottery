import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import moment from 'moment';
import actions from '../actions/index';
import constants from '../constants/index';
import service from '../services/index';

const styles = {
  base: {
    marginTop: '20px',
    ...constants.elementStyle.flexContainerColumnCenter,
  },
};

class DashboardPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      endDate: moment().format('YYYY-MM-DD'),
    };
    this.openPeriod = this.openPeriod.bind(this);
    this.closePeriod = this.closePeriod.bind(this);
  }
  componentWillMount() {
    this.props.setPageName('Host dashboard');
  }
  onEndDateChange() {
    return e => this.setState({ endDate: e.target.value });
  }
  openPeriod() {
    const self = this;
    self.props.setFetching(true);
    const endedAt = new Date(this.state.endDate);
    service.data
      .openPeriod(endedAt)
      .then((currentPeriod) => {
        self.props.setCurrentPeriod(currentPeriod);
        self.props.setFetching(false);
      });
  }
  closePeriod() {
    const self = this;
    self.props.setFetching(true);
    const { _id } = this.props.currentPeriod;
    service.data
      .closePeriod(_id)
      .then((currentPeriod) => {
        self.props.setCurrentPeriod(currentPeriod);
        self.props.setFetching(false);
      });
  }
  render() {
    const { currentPeriod } = this.props;
    return (
      <div style={styles.base}>
        <div className="container-fluid">
          {(!currentPeriod || !currentPeriod.isOpen) && (
            <div className="row">
              <div className="col-xs-12">
                <label htmlFor="txt--start-date">วันหวยออก</label>
                <input type="date" className="form-control" id="txt--start-date" value={this.state.endDate} onChange={this.onEndDateChange()} />
              </div>
              <div className="col-xs-12">
                <button className="btn btn-primary btn-block" style={{ marginBottom: '1em' }} onClick={this.openPeriod}>
                  <span>เปิดแทง</span>
                </button>
              </div>
              <div className="col-xs-12">
                <Link to={'/dashboard/result'} className="btn btn-default btn-block">
                  <span>กรอกผลรางวัลงวดล่าสุด</span>
                </Link>
              </div>
            </div>
          )}
          {currentPeriod && currentPeriod.isOpen && (
            <button className="btn btn-danger btn-block" style={{ marginBottom: '1em' }} onClick={this.closePeriod}>
              <span>ปิดรับแทง</span>
            </button>
          )}
          <Link to={'/dashboard/summary'} className="btn btn-default btn-block" style={{ marginTop: '1em' }}>
            <span>ดูสรุปยอดของงวดล่าสุด</span>
          </Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({ currentPeriod: state.data.currentPeriod });

const mapDispatchToProps = dispatch => (
  {
    setCurrentPeriod: currentPeriod => dispatch(actions.data.setCurrentPeriod(currentPeriod)),
    setFetching: fetching => dispatch(actions.data.setFetching(fetching)),
    setPageName: pageName => dispatch(actions.layout.setPageName(pageName)),
  }
);

DashboardPage.propTypes = {
  currentPeriod: constants.customPropType.periodShape,
  setCurrentPeriod: PropTypes.func,
  setFetching: PropTypes.func,
  setPageName: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);
