const user = require('./user');

module.exports = {
  init: keystone => {
    user(keystone);
  },
};
