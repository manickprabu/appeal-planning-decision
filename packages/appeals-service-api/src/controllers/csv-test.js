const config = require('../lib/config');

module.exports = {
  async get(req, res) {
    res.status(200).send(config.csv.test);
  },
};
