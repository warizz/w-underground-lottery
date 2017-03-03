import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as LayoutActionCreators from '../actions/layout';
import Faq from '../components/faq';
import * as paperShadow from '../constants/styles/paper-shadow';

const styles = {
  base: {
    margin: '1em',
    boxShadow: paperShadow.level1,
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

const mapDispatchToProps = dispatch => (bindActionCreators({ ...LayoutActionCreators }, dispatch));

export default connect(null, mapDispatchToProps)(FaqPage);
