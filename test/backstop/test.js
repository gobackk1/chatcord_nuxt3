const backstop = require('backstopjs')
const config = require('./backstop.json')
const fsExtra = require('fs-extra')
const assembleScenarios = require('./assembleScenarios.js')

config.scenarios = assembleScenarios()

/**
 * NOTE:
 * 画像データがたまらないように、テストごとに画像ディレクトリをクリーンアップする。
 * この機能に関するPRが立っているが、5年ほど放置されている。
 * https://github.com/garris/BackstopJS/issues/814
 */
if (process.argv[2] === 'test') {
  fsExtra.remove('./backstop_data/bitmaps_test')
}

// console.log(config, process.argv)
backstop('test', { config })
