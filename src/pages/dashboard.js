import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link, routerShape } from 'react-router';
import moment from 'moment';
import actions from '../actions/index';
import customPropTypes from '../constants/custom-prop-type';
import * as commonStyles from '../constants/styles/common';
import service from '../services/index';

const styles = {
  base: {
    marginTop: '20px',
    ...commonStyles.flexContainerColumnCenter,
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
    // if (this.props.username !== 'warizz' && this.props.username !== 'tob32') {
    //   this.props.router.push('/');
    // }
    this.props.setPageName('Host dashboard');
  }
  onEndDateChange() {
    return e => this.setState({ endDate: e.target.value });
  }
  openPeriod() {
    service.data.openPeriod(new Date(this.state.endDate));
  }
  closePeriod() {
    const period = this.props.periods[0];
    period.open = false;
    service.data.closePeriod(period);
  }
  render() {
    const period = this.props.periods[0];
    return (
      <div style={styles.base}>
        <div className="container-fluid">
          {(!period || !period.open) && (
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
          {period && period.open && (
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

const mapStateToProps = state => ({ period: state.data.period });

const mapDispatchToProps = dispatch => (
  {
    setPageName: pageName => dispatch(actions.layout.setPageName(pageName)),
  }
);

DashboardPage.propTypes = {
  periods: PropTypes.arrayOf(customPropTypes.periodShape),
  router: routerShape,
  setPageName: PropTypes.func,
  username: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);
