'use strict';

const _ = require('lodash');

function isNotNil(value) {
  return value != null;
}

module.exports = (validation) => function validate(attrs) {
  const errors = [];

  // tests: true means it is required, but has no other validation
  _.forEach(validation, (tests, key) => {
    if (tests === true) tests = [ isNotNil ];
    else if (!Array.isArray(tests)) tests = [ tests ];

    const value = _.get(attrs, key);

    if (value == null || !tests.every((test) => test(value))) {
      errors.push(key);
    }
  });

  return errors;
};

