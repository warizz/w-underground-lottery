import React from 'react';
import { shallow } from 'enzyme';
import ToolBar from '../../components/tool-bar';

describe('ToolBar', () => {
  it('renders without crashing', () => {
    shallow(<ToolBar />);
  });

  it('should render when pageName is null', () => {
    const wrapper = shallow(<ToolBar />);
    expect(
      wrapper.contains(
        <div className="tool-bar">
          <button className="icon-button" onClick={window.history.back}>
            <i className="material-icons">keyboard_backspace</i>
          </button>
        </div>
      )
    ).toBe(true);
  });

  it('should render when pageName === Home', () => {
    const wrapper = shallow(<ToolBar pageName="Home" />);
    expect(
      wrapper.contains(
        <div className="tool-bar">
          <i className="material-icons">home</i>
          <span className="page-name">Home</span>
        </div>
      )
    ).toBe(true);
  });

  it('should render when pageName !== Home', () => {
    const wrapper = shallow(<ToolBar pageName="Other" />);
    expect(
      wrapper.contains(
        <div className="tool-bar">
          <button className="icon-button" onClick={window.history.back}>
            <i className="material-icons">keyboard_backspace</i>
          </button>
          <span className="page-name">Other</span>
        </div>
      )
    ).toBe(true);
  });
});
