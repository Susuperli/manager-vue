const fs = require('fs')

const fileRelate = {
  // 获取文件路径
  getFilePath: (fileName) => {
    return `./files/${fileName}`
  },
  // 获取文件内容
  getFileContent: (fileName) => {
    return fs.readFileSync(fileRelate.getFilePath(fileName), 'utf-8')
  },
  // 写入文件内容
  writeFileContent: (fileName, content) => {
    fs.writeFileSync(fileRelate.getFilePath(fileName), content)
    return true
  }
}

module.exports = {
  // 读取文件中某个对象
  getFileObject: (fileName, key) => {
    let content = fileRelate.getFileContent(fileName)
    let obj = JSON.parse(content)
    return obj[key]
  },
  // 写入文件中某个对象
  writeFileObject: (fileName, key, value) => {
    let content = fileRelate.getFileContent(fileName)
    let obj = JSON.parse(content)
    obj[key] = value

    writeFileContent(fileName, JSON.stringify(obj))
  }
}
