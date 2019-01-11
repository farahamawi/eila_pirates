const Pirates = require('./pirates');
const Auth = require('./auth');

module.exports = () => ({
  auth: new Auth(),
  pirates: new Pirates(),
});
