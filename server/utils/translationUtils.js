// translationUtils.js

const BASE62_ALPHABET = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";



function encodeBase62(num) {
  if (num === 0) return BASE62_ALPHABET[0];

  let encoded = "";
  while (num > 0) {
    encoded = BASE62_ALPHABET[num % 62] + encoded;
    num = Math.floor(num / 62);
  }
  return encoded;
}

module.exports = {
  encodeBase62,
};
