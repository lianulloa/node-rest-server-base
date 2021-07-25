const validateJWT = require("./validate-jwt")
const validateRols = require("./validate-rols")
const validateFields = require("./validateFields")
const validateFile = require("./validate-file")

module.exports = {
  ...validateJWT,
  ...validateRols,
  ...validateFields,
  ...validateFile
}