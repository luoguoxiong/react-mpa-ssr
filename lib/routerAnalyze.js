const fs = require('fs')
const chalk = require('chalk')
function routerAnalyze(entryPath, outputFile, callback) {
  let existpath = fs.existsSync(entryPath) //是否存在目录
  if (existpath) {
    let readdirSync = fs.readdirSync(entryPath) //获取目录下所有文件
    let loadableArr = []
    let routeArr = []
    for (let key of readdirSync) {
      if (key !== 'index.js') {
        const { loadableString, routeString } = setOptions(key)
        routeArr.push(routeString)
        loadableArr.push(loadableString)
      } else {
        const { loadableString, routeString } = setOptions('home')
        routeArr.push(routeString)
        loadableArr.push(loadableString)
      }
    }
    const headerString = `import React from 'react'\nimport Loadable from 'react-loadable'`

    const loadableStrings = loadableArr.join('\n ')
    const routeStrings = routeArr.join('\n ')
    const all =
      headerString +
      '\n' +
      loadableStrings +
      '\nconst routes = [\n' +
      routeStrings +
      '\n]\nexport default routes'

    //判断文件/目录是否存在
    fs.access(outputFile, err => {
      if (!err) {
        fs.readFile(outputFile, { encoding: 'utf-8' }, function(err, str) {
          if (err) {
            console.log(err)
            throw err
          } else {
            if (str !== all) {
              console.log(chalk.yellow('√ 文件发生改变！'))
              fs.unlink(outputFile, function(err) {
                if (err) {
                  console.log(chalk.red('× 文件更新失败！'))
                  throw err
                } else {
                  fs.writeFile(outputFile, all, { flag: 'a' }, function(err) {
                    console.log(chalk.green('√ 文件更新成功！'))
                    callback()
                    if (err) {
                      console.log(chalk.red('× 文件更新失败！'))
                      throw err
                    }
                  })
                }
              })
            } else {
              console.log(chalk.green('√ 文件不需要修改'))
              callback()
            }
          }
        })
      } else {
        fs.writeFile(outputFile, all, { flag: 'a' }, function(err) {
          if (err) {
            console.log('× 文件创建失败！')
            throw err
          } else {
            console.log(chalk.green('√ 文件创建成功！'))
            callback()
          }
        })
      }
    })
    return
  } else {
    console.log(
      chalk.red('× src目录下没有page文件夹,请建立你的路由页面！- _ -!!')
    )
  }
}
function setOptions(pathName) {
  const componentName = pathName[0].toUpperCase() + pathName.substring(1)
  const loadableString = `const ${componentName} = Loadable({
    loader: () => import(/* webpackChunkName: '${componentName}' */ './page${
    pathName === 'home' ? '' : `/${pathName}`
  }'),
    loading: () => {
      return null
    }
})`
  const routeString = `{
    path: '/${pathName === 'home' ? "'" : `${pathName}'`},
    component: <${componentName}></${componentName}>
  },`
  return {
    loadableString,
    routeString
  }
}

module.exports = routerAnalyze
