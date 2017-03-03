import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import * as LayoutActionCreators from '../actions/layout';
import * as DataActionCreators from '../actions/data';
import * as lib from '../constants/lib';
import * as customPropTypes from '../constants/custom-prop-type';
import * as commonStyles from '../constants/styles/common';
import Snackbar from '../components/snackbar';

const validateNumber = value => /^[0-9]*$/.test(value);

const styles = {
  base: {
    marginTop: '1em',
    ...commonStyles.flexContainerColumnCenter,
  },
};

class ResultInputPage extends React.Component {
  constructor(props) {
    super(props);
    const result = props.period ? { ...props.period.result } : {};
    this.state = {
      six: result.six || '',
      two: result.two || '',
      firstThree: result.firstThree || '',
      secondThree: result.secondThree || '',
      active: false,
      message: '',
    };
    this.handleSaveInput = this.handleSaveInput.bind(this);
    this.postPeriodCallback = this.postPeriodCallback.bind(this);
  }
  componentDidMount() {
    this.props.setPageName('กรอกผลรางวัล');
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.period) {
      if (nextProps.period.result) {
        this.setState({ ...nextProps.period.result });
      }
    }
  }
  onInputChange(key, length) {
    return (e) => {
      this.setState({ [`${key}Dirty`]: true });
      if (validateNumber(e.target.value) === false) {
        return;
      }
      if (e.target.value.length > length) return;
      this.setState({ [key]: e.target.value });
    };
  }
  setAlert(message) {
    return () => {
      this.setState({ active: true, message });
      setTimeout(() => this.setState({ active: false, message: '' }), 1000);
    };
  }
  componentWillUnMount() {
    this.setState({ active: false, messagea: '' });
  }
  handleSaveInput(e) {
    e.preventDefault();
    const period = this.props.period;
    period.result = {
      six: this.state.six,
      two: this.state.two,
      firstThree: this.state.firstThree,
      secondThree: this.state.secondThree,
    };
    lib.postPeriod(period, this.postPeriodCallback);
  }
  postPeriodCallback(period) {
    this.props.setPeriod(period);
    this.setAlert('saved completed')();
  }
  render() {
    if (!this.props.period) {
      return (
        <div />
      );
    }
    // TODO: refactor this validations
    const sixValid = this.state.six && this.state.six.toString().length === 6;
    const sixInvalidAndDirty = !sixValid && this.state.sixDirty;
    const twoValid = this.state.two && this.state.two.toString().length === 2;
    const twoInvalidAndDirty = !twoValid && this.state.twoDirty;
    const firstThreeValid = this.state.firstThree && this.state.firstThree.toString().length === 3;
    const firstThreeInvalidAndDirty = !firstThreeValid && this.state.firstThreeDirty;
    const secondThreeValid = this.state.secondThree && this.state.secondThree.toString().length === 3;
    const secondThreeInvalidAndDirty = !secondThreeValid && this.state.secondThreeDirty;
    const validInput = sixValid && twoValid && firstThreeValid && secondThreeValid;
    return (
      <div style={styles.base}>
        <form className="col-sm-12 col-md-3">
          <h3 style={{ margin: '1em 0 1em 0', textAlign: 'center' }}>
            {`งวดวันที่ ${moment(this.props.period.endDate).format('DD MMM YYYY')}`}
          </h3>
          <div className="row" style={commonStyles.flexContainerColumnCenter}>
            <div className={`form-group col-xs-6${sixInvalidAndDirty ? ' has-error' : ''}`}>
              <label className="control-label" htmlFor="six">รางวัลที่หนึ่ง</label>
              <input
                id="six"
                className="form-control"
                min="0"
                onChange={this.onInputChange('six', 6)}
                onKeyPress={this.handleNumberValidation}
                type="tel"
                value={this.state.six}
              />
              {sixInvalidAndDirty && <label className="control-label" htmlFor="six">ต้องเป็นเลข 6 ตัว</label>}
            </div>
          </div>
          <div className="row" style={commonStyles.flexContainerColumnCenter}>
            <div className={`form-group col-xs-6${twoInvalidAndDirty ? ' has-error' : ''}`}>
              <label className="control-label" htmlFor="two">เลขท้ายสองตัว</label>
              <input
                id="two"
                className="form-control"
                onChange={this.onInputChange('two', 2)}
                type="tel"
                value={this.state.two}
              />
              {twoInvalidAndDirty && <label className="control-label" htmlFor="two">ต้องเป็นเลข 2 ตัว</label>}
            </div>
          </div>
          <div className="row">
            <div className={`form-group col-xs-6${firstThreeInvalidAndDirty ? ' has-error' : ''}`}>
              <label className="control-label" htmlFor="firstThree">สามตัวล่าง #1</label>
              <input
                id="firstThree"
                className="form-control"
                onChange={this.onInputChange('firstThree', 3)}
                type="tel"
                value={this.state.firstThree}
              />
              {firstThreeInvalidAndDirty && <label className="control-label" htmlFor="firstThree">ต้องเป็นเลข 3 ตัว</label>}
            </div>
            <div className={`form-group col-xs-6${secondThreeInvalidAndDirty ? ' has-error' : ''}`}>
              <label className="control-label" htmlFor="secondThree">สามตัวล่าง #2</label>
              <input
                id="secondThree"
                className="form-control"
                onChange={this.onInputChange('secondThree', 3)}
                type="tel"
                value={this.state.secondThree}
              />
              {secondThreeInvalidAndDirty && <label className="control-label" htmlFor="secondThree">ต้องเป็นเลข 3 ตัว</label>}
            </div>
          </div>
          <button className="btn btn-primary btn-block" onClick={this.handleSaveInput} disabled={!validInput}>save</button>
          <Snackbar active={this.state.active} text={this.state.message} />
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({ period: state.data.period });

const mapDispatchToProps = dispatch => (
  bindActionCreators({ ...LayoutActionCreators, ...DataActionCreators }, dispatch)
);

ResultInputPage.propTypes = {
  period: customPropTypes.periodShape,
  setPageName: PropTypes.func,
  setPeriod: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ResultInputPage);
