const fs = require('fs')
const path = require('path')

const fileRelate = {
  // 获取文件路径
  getFilePath: (fileName) => {
    return `./files/${fileName}`
  },
  // 获取文件内容
  getFileContent: (fileName) => {
    const content = fs.readFileSync(fileRelate.getFilePath(fileName), 'utf-8')

    return JSON.parse(content)
  },
  // 写入文件内容
  writeFileContent: (fileName, _content) => {
    let content = typeof _content === 'string' ? _content : JSON.stringify(_content)

    fs.writeFileSync(fileRelate.getFilePath(fileName), content, 'utf-8')
    return true
  },
  // 异步写入文件内容
  writeFileContentAsync: (fileName, _content) => {
    let content = typeof _content === 'string' ? _content : JSON.stringify(_content)

    fs.writeFile(fileRelate.getFilePath(fileName), content, 'utf-8', (err) => {
      if (err) {
        console.log(err)
      }
    })
    return true
  },
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

const writeToken = (username, token) => {
  const content = fileRelate.getFileContent('token.json')
  content[username] = token
  fileRelate.writeFileContentAsync('token.json', content)

  return content
}

module.exports = {
  fileRelate,
  writeToken
}
