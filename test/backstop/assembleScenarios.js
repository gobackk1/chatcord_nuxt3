const fs = require('fs')
const componentDirs = ['atoms', 'molecules', 'organisms']

function assembleScenarios() {
  const scenarios = []
  for (const dir of componentDirs) {
    for (const component of fs.readdirSync(`./components/${dir}`)) {
      if (!component.match(/.ts/)) {
        const files = fs.readdirSync(`./components/${dir}/${component}`)
        for (const file of files) {
          if (file.match(/backstop.json/)) {
            const backstopJson = require(`../../components/${dir}/${component}/${file}`)
            backstopJson.scenarios.forEach((scenario) =>
              scenarios.push(scenario)
            )
          }
        }
      }
    }
  }
  return scenarios
}

module.exports = assembleScenarios
