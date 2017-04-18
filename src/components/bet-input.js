import React, { PropTypes } from 'react';
import constants from '../constants/index';
import Snackbar from '../components/snackbar';

const validateNumber = value => /^[0-9]*$/.test(value);
const getRandomNumber = (minLength, maxLength) => {
  let number = '';
  const possible = '0123456789';
  const min = Math.ceil(minLength);
  const max = Math.floor(maxLength);
  const length = Math.floor(Math.random() * ((max - min) + 1)) + min;

  for (let i = 0; i < length; i += 1) {
    number += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return number;
};

const style = {
  container: {
    position: 'relative',
    backgroundColor: 'white',
    height: '100%',
    width: '300px',
    maxWidth: '300px',
    border: '1px solid #b8bfc3',
    borderRadius: '5px',
    overflow: 'hidden',
  },
  body: {
    padding: '10px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    margin: '0 0 10px 0',
  },
  input: {
    border: '1px solid #d9d9d9',
    borderTop: '1.5px solid #c0c0c0',
    padding: '5px 5px 5px 10px',
  },
  button: {
    random: {
      background: '#e0e1e2 none',
      color: 'rgba(0,0,0,.6)',
      height: '32px',
      border: 'none',
      borderRadius: '3px',
      padding: '5px 10px',
      margin: '0 0 10px 10px',
    },
  },
  action: {
    container: {
      backgroundColor: '#F6F7F9',
      borderTop: '1px solid #b8bfc3',
    },
    button: {
      base: {
        backgroundColor: 'transparent',
        border: 'none',
        fontWeight: 'bold',
        padding: '10px',
        width: '50%',
      },
      cancel: {
        color: 'rgb(148, 146, 146)',
        borderRight: '1px solid #b8bfc3',
      },
      bet: {
        color: '#286090',
      },
    },
  },
};

class BetInput extends React.Component {
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
    const number = getRandomNumber(1, 3);
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
      if (validateNumber(e.target.value) === false) return;
      this.setState({ [key]: e.target.value });
    };
  }
  handleNumberChange(e) {
    if (validateNumber(e.target.value) === false) return;
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
    const { alertText, hasAlert } = this.state;
    return (
      <div style={style.container}>
        <Snackbar active={hasAlert} text={alertText} timer={2000} onClose={() => this.setState({ hasAlert: false, alertText: '' })} />
        <div id="bet-editor" style={style.body} tabIndex={0}>
          <div style={{ display: 'flex', alignItems: 'flex-end' }}>
            <div style={style.inputGroup}>
              <label htmlFor="number">เลข</label>
              <input
                autoFocus
                id="number"
                onChange={this.handleNumberChange}
                style={{ ...style.input, width: '70px' }}
                type="number"
                value={this.state.number}
              />
            </div>
            <button style={style.button.random} onClick={this.getRandomNumber}>random</button>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={style.inputGroup}>
              {this.state.enablePrice3 === false && <label htmlFor="price1">บน</label>}
              {this.state.enablePrice3 && <label htmlFor="price1">เต็ง</label>}
              <input
                id="price1"
                onChange={this.handlePriceChange('price1')}
                style={{ ...style.input, width: '85px' }}
                type="number"
                value={this.state.price1}
              />
            </div>
            <div style={style.inputGroup}>
              {this.state.enablePrice3 === false && <label htmlFor="price2">ล่าง</label>}
              {this.state.enablePrice3 && <label htmlFor="price1">โต๊ด</label>}
              <input
                id="price2"
                onChange={this.handlePriceChange('price2')}
                style={{ ...style.input, width: '85px' }}
                type="number"
                value={this.state.price2}
              />
            </div>
            <div style={{ ...style.inputGroup, visibility: this.state.enablePrice3 ? 'visible' : 'hidden' }}>
              <label htmlFor="price3">ล่าง</label>
              <input
                id="price3"
                onChange={this.handlePriceChange('price3')}
                style={{ ...style.input, width: '85px' }}
                type="number"
                value={this.state.price3 || ''}
              />
            </div>
          </div>
        </div>
        <div style={style.action.container}>
          <button style={{ ...style.action.button.base, ...style.action.button.cancel }} onClick={this.reset}>reset</button>
          <button style={{ ...style.action.button.base, ...style.action.button.bet }} onClick={this.handleSaveBet}>save</button>
        </div>
      </div>
    );
  }
}

BetInput.propTypes = {
  editingBet: constants.customPropType.betShape,
  saveBetHandler: PropTypes.func.isRequired,
};

export default BetInput;
