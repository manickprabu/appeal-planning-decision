const { checkSchema } = require('express-validator');
const anyOfFollowingSchema = require('./any-of-following-schema');

const rules = () => {
  return [checkSchema(anyOfFollowingSchema)];
};

module.exports = {
  rules,
};
