const routerAnalyze = require('../lib/routerAnalyze')
const path = require('path')
const entry = path.resolve(__dirname, '../src/page')
const output = path.resolve(__dirname, '../src/routes.js')
routerAnalyze(entry, output, () => {})
