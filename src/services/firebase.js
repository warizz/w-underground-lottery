import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyBzac2HLbex9FQ_abz2SJk5uu-FErQjGOU',
  authDomain: 'underground-lottery.firebaseapp.com',
  databaseURL: 'https://underground-lottery.firebaseio.com',
  storageBucket: 'underground-lottery.appspot.com',
  messagingSenderId: '69941463181',
};

firebase.initializeApp(config);

export default firebase;
