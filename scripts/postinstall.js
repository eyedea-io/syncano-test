const fs = require('fs')
const os = require('os')
const {resolve} = require('path')
const appPackagePath = resolve('../../../package.json')

if (!fs.existsSync(appPackagePath)) process.exit(0)

const appPackage = require(appPackagePath)

if (appPackage) {
  if (
    !appPackage.scripts ||
    !appPackage.scripts.test ||
    appPackage.scripts.test === 'syncano-scripts test'
  ) {
    appPackage.scripts = {
      ...appPackage.scripts,
      test: 'jest'
    }
  }

  if (
    !appPackage.babel ||
    !appPackage.babel.extends ||
    appPackage.babel.extends === '@eyedea/syncano/config/babel'
  ) {
    appPackage.babel = {
      ...appPackage.babel,
      extends: '@eyedea/syncano-test/config/babel'
    }
  }

  save()
}

function save() {
  fs.writeFileSync(
    resolve('package.json'),
    JSON.stringify(appPackage, null, 2) + os.EOL
  )
}
