const { v4: uuidv4} = require("uuid")
const path = require("path")

const uploadFileHelper = (files, validExtensions = ["png", "jpg", "jpeg", "gif"], folder = "") => {

  return new Promise((resolve, reject) => {
    const file = files.file
    // const name = file.name.split(".")
    const extension = file.name.split(".").pop()
    
    if (!validExtensions.includes(extension)) {
      return reject(`the extension ${extension} is not allowed - ${validExtensions}`)
    }
  
    const name = uuidv4() + "." + extension
    const uploadPath = path.join(__dirname, '../uploads/', folder, name)
  
    file.mv(uploadPath, function(err) {
      if (err)
        return reject(err)

      resolve(name)
    })
  })
}

module.exports = {
  uploadFileHelper
}