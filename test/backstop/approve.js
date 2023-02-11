const backstop = require('backstopjs')
const config = require('./backstop.json')
const assembleScenarios = require('./assembleScenarios')

config.scenarios = assembleScenarios()
backstop('approve', { config })
