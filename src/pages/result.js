import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import actions from '../actions/index';
import constants from '../constants/index';
import service from '../services/index';
import Snackbar from '../components/snackbar';

const validateNumber = value => /^[0-9]*$/.test(value);

const styles = {
  base: {
    marginTop: '1em',
    ...constants.elementStyle.flexContainerColumnCenter,
  },
};

class ResultInputPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      six: '',
      two: '',
      firstThree: '',
      secondThree: '',
      active: false,
      message: '',
    };
    this.handleSaveInput = this.handleSaveInput.bind(this);
    this.setAlert = this.setAlert.bind(this);
  }
  componentDidMount() {
    this.props.setPageName('กรอกผลรางวัล');
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.currentPeriod && nextProps.currentPeriod.result) {
      this.setState({
        six: nextProps.currentPeriod.result.six,
        two: nextProps.currentPeriod.result.two,
        firstThree: nextProps.currentPeriod.result.firstThree,
        secondThree: nextProps.currentPeriod.result.secondThree,
      });
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
  setAlert(alertText) {
    return () => {
      this.setState({
        alertText,
        fetching: false,
        hasAlert: true,
      });
    };
  }
  componentWillUnMount() {
    this.setState({ hasAlert: false, alertText: '' });
  }
  handleSaveInput(e) {
    e.preventDefault();
    const self = this;
    const update = {
      result: {
        six: this.state.six,
        two: this.state.two,
        firstThree: this.state.firstThree,
        secondThree: this.state.secondThree,
      },
    };
    self.props.setFetching(true);
    service
      .data
      .updatePeriod(self.props.currentPeriod.id, update)
      .then(() => {
        service
          .data
          .getCurrentPeriod()
          .then((res) => {
            self.props.setCurrentPeriod(res);
            self.props.setFetching(false);
            this.setAlert('saved')();
          })
          .catch(error => this.setAlert(`${error.response.status}: ${error.response.statusText}`));
      });
  }
  render() {
    const { alertText, hasAlert } = this.state;
    const { currentPeriod } = this.props;
    if (!currentPeriod) {
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
            {`งวดวันที่ ${moment(currentPeriod.endedAt).format('DD MMM YYYY')}`}
          </h3>
          <div className="row" style={constants.elementStyle.flexContainerColumnCenter}>
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
          <div className="row" style={constants.elementStyle.flexContainerColumnCenter}>
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
        </form>
        <Snackbar active={hasAlert} text={alertText} onClose={() => this.setState({ hasAlert: false, alertText: '' })} />
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

ResultInputPage.propTypes = {
  currentPeriod: constants.customPropType.periodShape,
  setPageName: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(ResultInputPage);
