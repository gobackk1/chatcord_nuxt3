const backstop = require('backstopjs')
const config = require('./backstop.json')
const assembleScenarios = require('./assembleScenarios.js')

config.scenarios = assembleScenarios()
backstop('reference', { config })
