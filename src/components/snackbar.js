import React, { PropTypes } from 'react';

const styles = {
  active: {
    bottom: '1em',
  },
  base: {
    display: 'flex',
    height: '3em',
    justifyContent: 'center',
    left: 0,
    padding: '0 1em',
    position: 'fixed',
    right: 0,
    transition: 'bottom .3s',
    width: '100%',
  },
  inactive: {
    bottom: '-3em',
  },
  snackbar: {
    alignItems: 'center',
    backgroundColor: 'black',
    boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
    color: 'orange',
    display: 'flex',
    height: '100%',
    paddingLeft: '1em',
    width: '300px',
  },
};

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
    const baseStyle = active ? { ...styles.base, ...styles.active } : { ...styles.base, ...styles.inactive };
    return (
      <div style={baseStyle}>
        <div style={styles.snackbar}>
          {text}
        </div>
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
