import React from 'react';
import { PropTypes } from 'prop-types';
import Link from 'react-router/lib/Link';
import Card from '../components/card';
import './dashboard.css';

const DashboardPage = (props) => {
  const { currentPeriod, endDate, endDateChangedCallback, closeButtonClickedCallback, openPeriodClickedCallback } = props;
  let endDateSeletorElement = null;
  let openPeriodButtonElement = null;
  let closePeriodButtonElement = null;

  if (currentPeriod.isOpen === false) {
    endDateSeletorElement = (
      <div className="body">
        <div className="row">
          <div className="input-group">
            <label htmlFor="txt-start-date">วันหวยออก</label>
            <input type="date" id="txt-start-date" value={endDate} onChange={endDateChangedCallback} />
          </div>
        </div>
      </div>
    );
    openPeriodButtonElement = (
      <div className="action column">
        <button className="border-bottom primary" onClick={() => openPeriodClickedCallback(endDate)}>{'เปิดแทง'}</button>
        <Link to="/dashboard/result">{'กรอกผลรางวัลงวดล่าสุด'}</Link>
      </div>
    );
  }

  if (currentPeriod.isOpen) {
    closePeriodButtonElement = (
      <div className="action" style={{ border: 'none' }}>
        <button className="danger" onClick={() => closeButtonClickedCallback(currentPeriod.id)}>{'ปิดรับแทง'}</button>
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
    </div>
  );
};

DashboardPage.propTypes = {
  currentPeriod: PropTypes.shape({
    id: PropTypes.string,
    isOpen: PropTypes.bool,
  }),
  endDate: PropTypes.instanceOf(Date),
  endDateChangedCallback: PropTypes.func,
  closeButtonClickedCallback: PropTypes.func,
  openPeriodClickedCallback: PropTypes.func,
};

DashboardPage.defaultProps = {
  currentPeriod: {},
  endDate: new Date(),
  endDateChangedCallback() {},
  closeButtonClickedCallback() {},
  openPeriodClickedCallback() {},
};

export default DashboardPage;
