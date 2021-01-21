import FileHound from 'filehound'
import fs from 'fs'
import path from 'path'

const dirname = path.resolve()

async function getFilePaths() {
  const files = FileHound.create()
    .paths(`${dirname}/dist`)
    .ext('js')
    .find()

  return files
}

function appendExtensions(filePath) {
  fs.readFile(filePath, 'utf8', (error, data) => {
    if(error) throw error

    if(!data.match(/import .* from/g) && !data.match(/export .* from/g)) return
    let newData = data.replace(/(import .* from\s+['"])(\.*\/)(.*)(?=['"])/g, '$1$2$3.js')
    let finalData = newData.replace(/(export .* from\s+['"])(\.\/)(.*)(?=['"])/g, '$1$2$3.js')

    fs.writeFile(filePath, finalData, error => { 
      if(error) throw error
    })
  })
}

function main() {
  getFilePaths().then((filePathsAll) => {
    filePathsAll.forEach((singleFilePath) => {
      appendExtensions(singleFilePath)
    })
  })
}

main()