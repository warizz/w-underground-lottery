import React from 'react';
import { PropTypes } from 'prop-types';
import Link from 'react-router/lib/Link';
import Card from '../components/card';
import Summary from '../pages/summary';
import './dashboard.css';

const DashboardPage = (props) => {
  const { currentPeriod, endDate, endDateChangedCallback, closeButtonClickedCallback, openPeriodClickedCallback, setAlert } = props;
  let endDateSeletorElement = null;
  let openPeriodButtonElement = null;
  let closePeriodButtonElement = null;

  if (!currentPeriod.isOpen) {
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
        <button id="open-period" className="border-bottom primary" onClick={() => openPeriodClickedCallback(endDate)}>{'เปิดแทง'}</button>
        <Link id="to-result" to="/dashboard/result">{'กรอกผลรางวัลงวดล่าสุด'}</Link>
      </div>
    );
  }

  if (currentPeriod.isOpen) {
    closePeriodButtonElement = (
      <div className="action" style={{ border: 'none' }}>
        <button id="close-period" className="danger" onClick={() => closeButtonClickedCallback(currentPeriod.id)}>{'ปิดรับแทง'}</button>
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
      <Summary bets={props.summary.bets} currentPeriod={props.currentPeriod} service={props.service} setPaid={props.setPaid} setAlert={setAlert} />
    </div>
  );
};

DashboardPage.propTypes = {
  currentPeriod: PropTypes.shape({
    id: PropTypes.string,
    isOpen: PropTypes.bool,
  }),
  endDate: PropTypes.string.isRequired,
  endDateChangedCallback: PropTypes.func,
  closeButtonClickedCallback: PropTypes.func,
  openPeriodClickedCallback: PropTypes.func,
  summary: PropTypes.shape({
    bets: PropTypes.arrayOf(PropTypes.shape({})),
  }),
  setAlert: PropTypes.func,
  setPaid: PropTypes.func,
  service: PropTypes.shape({
    data: PropTypes.shape({
      getCurrentPeriod: PropTypes.func,
      openPeriod: PropTypes.func,
      updatePeriod: PropTypes.func,
    }),
  }),
};

DashboardPage.defaultProps = {
  currentPeriod: {
    isOpen: false,
  },
  endDateChangedCallback() {},
  closeButtonClickedCallback() {},
  openPeriodClickedCallback() {},
  summary: {},
  setAlert() {},
  setPaid() {},
  service: {
    data: {
      getCurrentPeriod() {},
      openPeriod() {},
      updatePeriod() {},
    },
  },
  copyToClipboard() {},
};

export default DashboardPage;
