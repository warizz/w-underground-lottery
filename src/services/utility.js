function getRandomNumber(minLength, maxLength) {
  let number = '';
  const possible = '0123456789';
  const min = Math.ceil(minLength);
  const max = Math.floor(maxLength);
  const length = Math.floor(Math.random() * ((max - min) + 1)) + min;

  for (let i = 0; i < length; i += 1) {
    number += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return number;
}

function validateNumber(value) {
  return /^[0-9]*$/.test(value);
}

export default {
  getRandomNumber,
  validateNumber,
};
