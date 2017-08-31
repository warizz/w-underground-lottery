import React from 'react';
import { PropTypes } from 'prop-types';
import Card from '../components/Card';
import Summary from '../pages/summary';
import './dashboard.css';

const DashboardPage = props => {
  const {
    currentPeriod,
    endDate,
    endDateChangedCallback,
    closeButtonClickedCallback,
    openPeriodClickedCallback,
    setAlert,
    updateResultClickedCallback,
    isUpdatingResult,
  } = props;
  let endDateSeletorElement = null;
  let openPeriodButtonElement = null;
  let closePeriodButtonElement = null;
  let updateResultButtonElement = null;

  if (!currentPeriod.isOpen) {
    endDateSeletorElement = (
      <div className="body">
        <div className="row">
          <div className="input-group">
            <label htmlFor="txt-start-date">วันหวยออก</label>
            <input
              type="date"
              id="txt-start-date"
              value={endDate}
              onChange={endDateChangedCallback}
            />
          </div>
        </div>
      </div>
    );
    openPeriodButtonElement = (
      <div className="action column">
        <button
          id="open-period"
          className="border-bottom primary"
          onClick={() => openPeriodClickedCallback(endDate)}
        >
          {'เปิดแทง'}
        </button>
      </div>
    );
    updateResultButtonElement = (
      <div className="action column">
        <button
          id="update-result"
          className="border-bottom primary"
          onClick={() => updateResultClickedCallback()}
          disabled={isUpdatingResult}
        >
          {isUpdatingResult ? 'Updating...' : 'อัพเดทผลงวดล่าสุด'}
        </button>
      </div>
    );
  }

  if (currentPeriod.isOpen) {
    closePeriodButtonElement = (
      <div className="action" style={{ border: 'none' }}>
        <button
          id="close-period"
          className="danger"
          onClick={() => closeButtonClickedCallback(currentPeriod.id)}
        >
          {'ปิดรับแทง'}
        </button>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <Card>
        {endDateSeletorElement}
        {openPeriodButtonElement}
        {closePeriodButtonElement}
        {updateResultButtonElement}
      </Card>
      <Summary
        bets={props.summary.bets}
        currentPeriod={props.currentPeriod}
        service={props.service}
        setPaid={props.setPaid}
        setAlert={setAlert}
      />
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
  updateResultClickedCallback: PropTypes.func,
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
  isUpdatingResult: PropTypes.bool,
};

DashboardPage.defaultProps = {
  currentPeriod: {
    isOpen: false,
  },
  endDateChangedCallback() {},
  closeButtonClickedCallback() {},
  openPeriodClickedCallback() {},
  updateResultClickedCallback() {},
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
  isUpdatingResult: false,
};

export default DashboardPage;
