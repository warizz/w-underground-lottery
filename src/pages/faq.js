import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import actions from '../actions/index';
import Faq from '../components/faq';

const styles = {
  base: {
    margin: '1em',
    boxShadow: '0 1px 3px 0 rgba(0,0,0,0.2), 0 1px 1px 0 rgba(0,0,0,0.14), 0 2px 1px -1px rgba(0,0,0,0.12)', // 1
  },
};

class FaqPage extends React.Component {
  componentDidMount() {
    this.props.setPageName('FAQ');
  }
  render() {
    return (
      <div style={styles.base}>
        <Faq />
      </div>
    );
  }
}

FaqPage.propTypes = {
  setPageName: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => (
  {
    setPageName: pageName => dispatch(actions.layout.setPageName(pageName)),
  }
);

export default connect(null, mapDispatchToProps)(FaqPage);
