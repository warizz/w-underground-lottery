import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import actions from '../actions/index';
import constants from '../constants/index';
import service from '../services/index';
import Card from '../components/card';
import './result.css';

class ResultInputPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      six: '',
      two: '',
      firstThree: '',
      secondThree: '',
      thirdThree: '',
      fourthThree: '',
    };
    this.handleSaveInput = this.handleSaveInput.bind(this);
  }
  componentWillMount() {
    this.setResult(this.props.currentPeriod)();
  }
  componentDidMount() {
    this.props.setPageName('กรอกผลรางวัล');
  }
  componentWillReceiveProps(nextProps) {
    this.setResult(nextProps.currentPeriod)();
  }
  onInputChange(key, length) {
    return (e) => {
      this.setState({ [`${key}Dirty`]: true });
      if (service.utility.validateNumber(e.target.value) === false) {
        return;
      }
      if (e.target.value.length > length) return;
      this.setState({ [key]: e.target.value });
    };
  }
  setResult(currentPeriod) {
    return () => {
      if (!currentPeriod) return;
      if (!currentPeriod.result) return;
      this.setState({
        six: currentPeriod.result.six,
        two: currentPeriod.result.two,
        firstThree: currentPeriod.result.firstThree,
        secondThree: currentPeriod.result.secondThree,
        thirdThree: currentPeriod.result.thirdThree,
        fourthThree: currentPeriod.result.fourthThree,
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
        thirdThree: this.state.thirdThree,
        fourthThree: this.state.fourthThree,
      },
    };
    self.props.setFetching(true);
    service.data.updatePeriod(self.props.currentPeriod.id, update).then(() => {
      service.data
        .getCurrentPeriod()
        .then((res) => {
          this.props.setCurrentPeriod(res);
          this.props.setFetching(false);
          this.props.setAlert('saved');
        })
        .catch(error => this.setAlert(`${error.response.status}: ${error.response.statusText}`));
    });
  }
  render() {
    const { currentPeriod } = this.props;
    if (!currentPeriod) {
      return <div />;
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
    const thirdThreeValid = this.state.thirdThree && this.state.thirdThree.toString().length === 3;
    const thirdThreeInvalidAndDirty = !thirdThreeValid && this.state.thirdThreeDirty;
    const fourthThreeValid = this.state.fourthThree && this.state.fourthThree.toString().length === 3;
    const fourthThreeInvalidAndDirty = !fourthThreeValid && this.state.fourthThreeDirty;
    const validInput = sixValid && twoValid && firstThreeValid && secondThreeValid;
    return (
      <div className="result-editor">
        <Card>
          <div className="title">
            {`งวดวันที่ ${moment(currentPeriod.endedAt).format('DD MMM YYYY')}`}
          </div>
          <div className="body">
            <div className="row center">
              <div className={`input-group ${sixInvalidAndDirty ? ' has-error' : ''}`}>
                <label htmlFor="six">รางวัลที่หนึ่ง</label>
                <input id="six" min="0" onChange={this.onInputChange('six', 6)} onKeyPress={this.handleNumberValidation} type="number" value={this.state.six} />
                {sixInvalidAndDirty && <label htmlFor="six">ต้องเป็นเลข 6 ตัว</label>}
              </div>
            </div>
            <div className="row center">
              <div className={`input-group ${twoInvalidAndDirty ? ' has-error' : ''}`}>
                <label htmlFor="two">เลขท้ายสองตัว</label>
                <input id="two" onChange={this.onInputChange('two', 2)} type="number" value={this.state.two} />
                {twoInvalidAndDirty && <label htmlFor="two">ต้องเป็นเลข 2 ตัว</label>}
              </div>
            </div>
            <div className="row space-between">
              <div className={`input-group ${firstThreeInvalidAndDirty ? ' has-error' : ''}`}>
                <label htmlFor="firstThree">สามตัวล่าง #1</label>
                <input id="firstThree" onChange={this.onInputChange('firstThree', 3)} type="number" value={this.state.firstThree} />
                {firstThreeInvalidAndDirty && <label htmlFor="firstThree">ต้องเป็นเลข 3 ตัว</label>}
              </div>
              <div className={`input-group ${secondThreeInvalidAndDirty ? ' has-error' : ''}`}>
                <label htmlFor="secondThree">สามตัวล่าง #2</label>
                <input id="secondThree" onChange={this.onInputChange('secondThree', 3)} type="number" value={this.state.secondThree} />
                {secondThreeInvalidAndDirty && <label htmlFor="secondThree">ต้องเป็นเลข 3 ตัว</label>}
              </div>
            </div>
            <div className="row space-between">
              <div className={`input-group ${firstThreeInvalidAndDirty ? ' has-error' : ''}`}>
                <label htmlFor="thirdThree">สามตัวล่าง #3</label>
                <input id="thirdThree" onChange={this.onInputChange('thirdThree', 3)} type="number" value={this.state.thirdThree} />
                {thirdThreeInvalidAndDirty && <label htmlFor="thirdThree">ต้องเป็นเลข 3 ตัว</label>}
              </div>
              <div className={`input-group ${secondThreeInvalidAndDirty ? ' has-error' : ''}`}>
                <label htmlFor="fourthThree">สามตัวล่าง #4</label>
                <input id="fourthThree" onChange={this.onInputChange('fourthThree', 3)} type="number" value={this.state.fourthThree} />
                {fourthThreeInvalidAndDirty && <label htmlFor="fourthThree">ต้องเป็นเลข 3 ตัว</label>}
              </div>
            </div>
          </div>
          <div className="action">
            <button className="primary" onClick={this.handleSaveInput} disabled={!validInput}>save</button>
          </div>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = state => ({ currentPeriod: state.data.currentPeriod });

const mapDispatchToProps = dispatch => ({
  setAlert: alert => dispatch(actions.layout.setAlert(alert)),
  setCurrentPeriod: currentPeriod => dispatch(actions.data.setCurrentPeriod(currentPeriod)),
  setFetching: fetching => dispatch(actions.data.setFetching(fetching)),
  setPageName: pageName => dispatch(actions.layout.setPageName(pageName)),
});

ResultInputPage.propTypes = {
  currentPeriod: constants.customPropType.periodShape,
  setAlert: PropTypes.func.isRequired,
  setCurrentPeriod: PropTypes.func.isRequired,
  setFetching: PropTypes.func.isRequired,
  setPageName: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(ResultInputPage);
