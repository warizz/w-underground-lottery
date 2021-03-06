import React from 'react';
import PropTypes from 'prop-types';
import './snackbar.css';

class Snackbar extends React.Component {
  componentWillMount() {
    const { text } = this.props;
    this.setState({
      text,
    });
  }
  componentDidMount() {
    const { text } = this.state;
    const { timer } = this.props;
    if (text) this.setTimer(timer);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.text !== this.state.text) {
      const { text } = nextProps;
      this.setState({ text });
      const { timer } = this.props;
      this.setTimer(timer);
    }
  }
  setTimer(timer) {
    setTimeout(() => {
      this.setState({ text: '' });
      this.props.onClose();
    }, timer);
  }
  render() {
    const { text } = this.props;
    const containerClassName = `snackbar${text ? ' active' : ' inactive'}`;
    return (
      <div className={containerClassName}>
        <div className="body">{text}</div>
      </div>
    );
  }
}

Snackbar.propTypes = {
  onClose: PropTypes.func,
  text: PropTypes.string,
  timer: PropTypes.number,
};

Snackbar.defaultProps = {
  onClose() {},
  text: null,
  timer: 1000,
};

export default Snackbar;
