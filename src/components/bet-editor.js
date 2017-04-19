import React, { PropTypes } from 'react';
import service from '../services/index';
import constants from '../constants/index';
import './bet-editor.css';

class BetEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      enablePrice3: props.editingBet ? props.editingBet.number.toString().length > 2 : false,
      id: props.editingBet ? props.editingBet.id : '',
      number: props.editingBet ? props.editingBet.number : '',
      price1: props.editingBet ? (props.editingBet.price1 || '') : '',
      price2: props.editingBet ? (props.editingBet.price2 || '') : '',
      price3: props.editingBet ? (props.editingBet.price3 || '') : '',
    };
    this.handleNumberChange = this.handleNumberChange.bind(this);
    this.handleSaveBet = this.handleSaveBet.bind(this);
    this.getRandomNumber = this.getRandomNumber.bind(this);
    this.reset = this.reset.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      enablePrice3: nextProps.editingBet ? nextProps.editingBet.number.toString().length > 2 : false,
      id: nextProps.editingBet ? nextProps.editingBet.id : '',
      number: nextProps.editingBet ? nextProps.editingBet.number : '',
      price1: nextProps.editingBet ? (nextProps.editingBet.price1 || '') : '',
      price2: nextProps.editingBet ? (nextProps.editingBet.price2 || '') : '',
      price3: nextProps.editingBet ? (nextProps.editingBet.price3 || '') : '',
    });
  }
  shouldComponentUpdate(nextProps, nextState) {
    return (nextState !== this.state);
  }
  getRandomNumber() {
    const number = service.utility.getRandomNumber(1, 3);
    this.setState({ enablePrice3: number.length > 2 });
    this.setState({ number });
    document.getElementById('price1').focus();
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
  reset() {
    this.setState({
      enablePrice3: false,
      id: '',
      number: '',
      price1: '',
      price2: '',
      price3: '',
    });
  }
  handlePriceChange(key) {
    return (e) => {
      if (service.utility.validateNumber(e.target.value) === false) return;
      this.setState({ [key]: e.target.value });
    };
  }
  handleNumberChange(e) {
    if (service.utility.validateNumber(e.target.value) === false) return;
    this.setState({
      enablePrice3: e.target.value.length > 2,
      number: e.target.value.substring(0, 3),
      price3: '',
    });
  }
  handleSaveBet() {
    if (!this.state.number) {
      this.setAlert('number can not be blank')();
      return;
    }

    if (!this.state.price1 && !this.state.price2 && !this.state.price3) {
      this.setAlert('at least 1 price must be filled')();
      return;
    }

    if (this.state.number.length === 1) {
      if ((this.state.price1 && Number(this.state.price1) < 100)
        || (this.state.price2 && Number(this.state.price2) < 100)) {
        this.setAlert('เลขวิ่ง ขั้นต่ำ 100')();
        return;
      }
    }

    if (this.state.number.length > 1) {
      if ((this.state.price1 && Number(this.state.price1) < 10)
        || (this.state.price2 && Number(this.state.price2) < 10)
        || (this.state.price3 && Number(this.state.price3) < 10)) {
        this.setAlert('ขั้นต่ำ 10')();
        return;
      }
    }

    if (this.state.number.length > 2 && this.state.price2) {
      if (!this.state.price1) {
        this.setAlert('โต๊ด ต้อง เต็ง')();
        return;
      }
    }
    // const betItem = new Bet(this.state.id, null, this.state.number, this.state.price1, this.state.price2, this.state.price3, new Date());
    const bet = {
      id: this.state.id,
      number: this.state.number,
      price1: this.state.price1,
      price2: this.state.price2,
      price3: this.state.price3,
    };
    this.props.saveBetHandler(bet);
    this.setState({
      enablePrice3: false,
      id: '',
      number: '',
      price1: '',
      price2: '',
      price3: '',
    });
    document.getElementById('number').focus();
  }
  render() {
    // const { alertText, hasAlert } = this.state;
    return (
      <div className="bet-editor" id="bet-editor" tabIndex={0}>
        {
          // <Snackbar active={hasAlert} text={alertText} timer={2000} onClose={() => this.setState({ hasAlert: false, alertText: '' })} />
        }
        <div className="body">
          <div className="row">
            <div className="input-group">
              <label htmlFor="number">เลข</label>
              <input
                autoFocus
                id="number"
                onChange={this.handleNumberChange}
                type="number"
                value={this.state.number}
              />
            </div>
            <div className="input-group">
              <button className="random" onClick={this.getRandomNumber}>random</button>
            </div>
          </div>
          <div className="row">
            <div className="input-group">
              {this.state.enablePrice3 === false && <label htmlFor="price1">บน</label>}
              {this.state.enablePrice3 && <label htmlFor="price1">เต็ง</label>}
              <input
                id="price1"
                onChange={this.handlePriceChange('price1')}
                type="number"
                value={this.state.price1}
              />
            </div>
            <div className="input-group">
              {this.state.enablePrice3 === false && <label htmlFor="price2">ล่าง</label>}
              {this.state.enablePrice3 && <label htmlFor="price1">โต๊ด</label>}
              <input
                id="price2"
                onChange={this.handlePriceChange('price2')}
                type="number"
                value={this.state.price2}
              />
            </div>
            <div className={`input-group${this.state.enablePrice3 ? ' visible' : ' hidden'}`}>
              <label htmlFor="price3">ล่าง</label>
              <input
                id="price3"
                onChange={this.handlePriceChange('price3')}
                type="number"
                value={this.state.price3 || ''}
              />
            </div>
          </div>
        </div>
        <div className="action">
          <button className="reset" onClick={this.reset}>reset</button>
          <button className="save" onClick={this.handleSaveBet}>save</button>
        </div>
      </div>
    );
  }
}

BetEditor.propTypes = {
  editingBet: constants.customPropType.betShape,
  saveBetHandler: PropTypes.func.isRequired,
};

export default BetEditor;
