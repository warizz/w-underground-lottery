import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import moment from 'moment';
import actions from '../actions/index';
import constants from '../constants/index';
import service from '../services/index';
import Summary from './summary';
import Card from '../components/card';
import './dashboard.css';

const style = {
  container: {
    position: 'relative',
    backgroundColor: 'white',
    width: '300px',
    maxWidth: '300px',
    border: '1px solid #b8bfc3',
    borderRadius: '5px',
    overflow: 'hidden',
  },
  body: {
    container: {
      padding: '10px',
    },
    input: {
      group: {
        display: 'flex',
        flexDirection: 'column',
        margin: '0 0 10px 0',
      },
      label: {},
      textBox: {
        border: '1px solid #d9d9d9',
        borderTop: '1.5px solid #c0c0c0',
        padding: '5px 5px 5px 10px',
        letterSpacing: '3px',
      },
    },
  },
  action: {
    container: {
      backgroundColor: '#F6F7F9',
    },
    button: {
      base: {
        backgroundColor: 'transparent',
        border: 'none',
        fontWeight: 'bold',
        padding: '10px',
        width: '100%',
      },
      result: {
        color: 'rgb(148, 146, 146)',
        display: 'block',
        borderTop: '1px solid #b8bfc3',
        textAlign: 'center',
      },
      open: {
        color: '#286090',
        borderTop: '1px solid #b8bfc3',
      },
      close: {
        color: 'rgb(191, 58, 58)',
      },
    },
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
    this.props.setPageName('Admin dashboard');
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
    const { id } = this.props.currentPeriod;
    service.data
      .closePeriod(id)
      .then(() => {
        service.data
          .getCurrentPeriod()
          .then((res) => {
            self.props.setCurrentPeriod(res);
            self.props.setFetching(false);
          });
      });
  }
  render() {
    const { currentPeriod } = this.props;
    return (
      <div className="dashboard">
        {(!currentPeriod || !currentPeriod.isOpen) && (
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
        <div style={{ margin: '10px 0 0 0' }}>
          <Summary />
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
