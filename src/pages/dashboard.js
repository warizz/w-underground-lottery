import React from 'react';
import PropTypes from 'prop-types';
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
      <div className='body'>
        <div className='row'>
          <div className='input-group'>
            <label htmlFor='txt-start-date'>วันหวยออก</label>
            <input
              id='txt-start-date'
              onChange={endDateChangedCallback}
              type='date'
              value={endDate}
            />
          </div>
        </div>
      </div>
    );
    openPeriodButtonElement = (
      <div className='action column'>
        <button
          className='border-bottom primary'
          id='open-period'
          onClick={() => openPeriodClickedCallback(endDate)}
        >
          {'เปิดแทง'}
        </button>
      </div>
    );
    updateResultButtonElement = (
      <div className='action column'>
        <button
          className='border-bottom primary'
          disabled={isUpdatingResult}
          id='update-result'
          onClick={() => updateResultClickedCallback()}
        >
          {isUpdatingResult ? 'Updating...' : 'อัพเดทผลงวดล่าสุด'}
        </button>
      </div>
    );
  }

  if (currentPeriod.isOpen) {
    closePeriodButtonElement = (
      <div className='action' style={{ border: 'none' }}>
        <button
          className='danger'
          id='close-period'
          onClick={() => closeButtonClickedCallback(currentPeriod.id)}
        >
          {'ปิดรับแทง'}
        </button>
      </div>
    );
  }

  return (
    <div className='dashboard'>
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
        setAlert={setAlert}
        setPaid={props.setPaid}
      />
    </div>
  );
};

DashboardPage.propTypes = {
  closeButtonClickedCallback: PropTypes.func,
  currentPeriod: PropTypes.shape({
    id: PropTypes.string,
    isOpen: PropTypes.bool,
  }),
  endDate: PropTypes.string.isRequired,
  endDateChangedCallback: PropTypes.func,
  isUpdatingResult: PropTypes.bool,
  openPeriodClickedCallback: PropTypes.func,
  service: PropTypes.shape({
    data: PropTypes.shape({
      getCurrentPeriod: PropTypes.func,
      openPeriod: PropTypes.func,
      updatePeriod: PropTypes.func,
    }),
  }),
  setAlert: PropTypes.func,
  setPaid: PropTypes.func,
  summary: PropTypes.shape({
    bets: PropTypes.arrayOf(PropTypes.shape({})),
  }),
  updateResultClickedCallback: PropTypes.func,
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
