import React, { PropTypes } from 'react';
import Dialog from './dialog';
import Faq from './faq';

class FaqDialog extends React.Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.active !== this.props.active;
  }
  render() {
    const { active, toggle } = this.props;
    return (
      <Dialog active={active} toggle={toggle}>
        <Faq />
      </Dialog>
    );
  }
}

FaqDialog.propTypes = {
  active: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
};

export default FaqDialog;
