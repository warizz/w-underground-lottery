// @flow
import React from 'react';
import homeIcon from './home-icon.svg';
import backIcon from './back-icon.svg';

type Props = {
  onClickMainButton: () => void,
  pageName: string,
};

const Toolbar = (props: Props) => {
  const { onClickMainButton, pageName } = props;
  const getIcon = (pageName: string) => {
    switch (pageName) {
      case 'Home':
        return homeIcon;
      default:
        return backIcon;
    }
  };

  return (
    <div
      className="toolbar-component"
      style={{
        alignItems: 'center',
        backgroundColor: '#e9ebee',
        display: 'flex',
        height: '50px',
        opacity: '.8',
        padding: '0 20px',
        position: 'absolute',
        top: 0,
        width: '100%',
        zIndex: 1,
      }}>
      <button
        className="main"
        onClick={onClickMainButton}
        style={{
          backgroundColor: 'transparent',
          border: 'none',
          display: 'flex',
          padding: 0,
        }}>
        <img alt="main-icon" className="main-icon" src={getIcon(pageName)} />
      </button>
      <h1 className="page-name" style={{ margin: '0 0 0 16px' }}>
        {pageName}
      </h1>
    </div>
  );
};

export default Toolbar;
