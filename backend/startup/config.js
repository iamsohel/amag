const config = require('../config/keys').jwtPrivateKey;

module.exports = function() {
  if (!config) {
    throw new Error('FATAL ERROR: jwtPrivateKey is not defined.');
  }
}