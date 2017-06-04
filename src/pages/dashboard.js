import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Link from 'react-router/lib/Link';
import moment from 'moment';
import actions from '../actions/index';
import constants from '../constants/index';
import service from '../services/index';
import Summary from './summary';
import Card from '../components/card';
import './dashboard.css';

class DashboardPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      endDate: moment().format('YYYY-MM-DD'),
    };
    this.openPeriod = this.openPeriod.bind(this);
    this.closePeriod = this.closePeriod.bind(this);
    this.setPeriod = this.setPeriod.bind(this);
  }
  componentWillMount() {
    this.props.setPageName('Admin dashboard');
  }
  onEndDateChange() {
    return e => this.setState({ endDate: e.target.value });
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
    service.data.closePeriod(id).then(this.setPeriod);
  }
  render() {
    const { currentPeriod } = this.props;
    return (
      <div className="dashboard">
        {(!currentPeriod || !currentPeriod.isOpen) &&
          <Card>
            <div className="body">
              <div className="row">
                <div className="input-group">
                  <label htmlFor="txt-start-date">วันหวยออก</label>
                  <input type="date" id="txt-start-date" value={this.state.endDate} onChange={this.onEndDateChange()} />
                </div>
              </div>
            </div>
            <div className="action column">
              <button className="border-bottom primary" onClick={this.openPeriod}>{'เปิดแทง'}</button>
              <Link to="/dashboard/result">{'กรอกผลรางวัลงวดล่าสุด'}</Link>
            </div>
          </Card>
        )}
        {currentPeriod && currentPeriod.isOpen && (
          <Card>
            <div className="action" style={{ border: 'none' }}>
              <button className="danger" onClick={this.closePeriod}>{'ปิดรับแทง'}</button>
            </div>
          </Card>
        )}
        <Summary />
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
