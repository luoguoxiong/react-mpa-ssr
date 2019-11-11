require('./nodeRuntime.js')()
require('@babel/register')()
const routerAnalyze = require('../lib/routerAnalyze')
let isCreateRouter = false
if (!isCreateRouter) {
  const path = require('path')
  const entry = path.resolve(__dirname, '../src/page')
  const output = path.resolve(__dirname, '../src/routes.js')
  routerAnalyze(entry, output, () => {
    require('../service')
    isCreateRouter = true
  })
} else {
  require('../service')
}
