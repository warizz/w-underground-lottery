import React, { PropTypes } from 'react';
import './snackbar.css';

class Snackbar extends React.Component {
  componentWillMount() {
    const { active } = this.props;
    this.setState({
      active,
    });
  }
  componentDidMount() {
    const { active } = this.state;
    const { timer = 1000 } = this.props;
    if (active) this.setTimer(timer);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.active !== this.state.active) {
      const { active } = nextProps;
      this.setState({ active });
      const { timer = 1000 } = this.props;
      this.setTimer(timer);
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    return (nextProps.active !== this.state.active) || (nextState.active !== this.state.active);
  }
  setTimer(timer) {
    setTimeout(() => {
      this.setState({ active: false });
      this.props.onClose();
    }, timer);
  }
  render() {
    const { text } = this.props;
    const { active } = this.state;
    const containerClassName = `snackbar${active ? ' active' : ' inactive'}`;
    return (
      <div className={containerClassName}>
        <div className="body">{text}</div>
      </div>
    );
  }
}

Snackbar.propTypes = {
  active: PropTypes.bool,
  text: PropTypes.string,
  timer: PropTypes.number,
  onClose: PropTypes.func.isRequired,
};

export default Snackbar;
