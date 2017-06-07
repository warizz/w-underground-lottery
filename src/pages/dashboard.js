import React from 'react';
import { PropTypes } from 'prop-types';
import Link from 'react-router/lib/Link';
import Summary from './summary';
import Card from '../components/card';
import './dashboard.css';

class DashboardPage extends React.Component {
  render() {
    const { currentPeriod } = this.props;
    let endDateSeletorElement = null;
    let openPeriodButtonElement = null;
    let closePeriodButtonElement = null;

    if (currentPeriod.isOpen) {
      endDateSeletorElement = (
        <div className="body">
          <div className="row">
            <div className="input-group">
              <label htmlFor="txt-start-date">วันหวยออก</label>
              <input type="date" id="txt-start-date" value={this.state.endDate} onChange={this.endDateChangedCallback} />
            </div>
          </div>
        </div>
      );
      openPeriodButtonElement = (
        <div className="action column">
          <button className="border-bottom primary" onClick={this.openPeriod}>{'เปิดแทง'}</button>
          <Link to="/dashboard/result">{'กรอกผลรางวัลงวดล่าสุด'}</Link>
        </div>
      );
    }

    if (currentPeriod.isOpen === false) {
      closePeriodButtonElement = (
        <div className="action" style={{ border: 'none' }}>
          <button className="danger" onClick={this.closeButtonClickedCallback}>{'ปิดรับแทง'}</button>
        </div>
      );
    }

    return (
      <div className="dashboard">
        <Card>
          {endDateSeletorElement}
          {openPeriodButtonElement}
          {closePeriodButtonElement}
        </Card>
        <Summary />
      </div>
    );
  }
}

DashboardPage.propTypes = {
  currentPeriod: PropTypes.shape({
    isOpen: PropTypes.bool,
  }),
};

DashboardPage.defaultProps = {
  currentPeriod: {},
};

export default DashboardPage;
