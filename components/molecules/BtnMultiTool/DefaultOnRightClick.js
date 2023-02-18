module.exports = async (page, scenario, vp) => {
  console.log('SCENARIO > ' + scenario.label)
  await page.click(scenario.xRightClickSelector, { button: 'right' })
  await delay(5000)
}

function delay(time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time)
  })
}
