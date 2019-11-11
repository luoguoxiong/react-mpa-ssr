const fileName =
  'NODE_ENV' in process.env && process.env.NODE_ENV.includes('production')
    ? 'production'
    : 'development'
module.exports = require(`./${fileName}.json`)
