const backstop = require('backstopjs')
const fs = require('fs')

;(async () => {
  await backstop('init')
  fs.unlink('./backstop.json', (error) => {
    if (error) throw error
    console.log(
      'backstop.json was deleted. use test/backstop/backstop.json instead'
    )
  })
})()
