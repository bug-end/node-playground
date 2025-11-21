// Returns the root directory of the application

const path = require('path');

module.exports = path.dirname(require.main.filename);
