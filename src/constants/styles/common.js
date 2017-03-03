/*
rules:
must be used more than 2 places
*/

import * as paperShadow from './paper-shadow';

export const placeholder = {
  display: 'flex',
  justifyContent: 'center',
  marginTop: '30vh',
};
export const betCard = {
  backgroundColor: 'white',
  boxShadow: paperShadow.level1,
  borderBottom: '2px dashed #BDBDBD',
  padding: '1em',
  marginBottom: '1em',
};
export const flexContainerColumnCenter = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};
