const validateJWT = require("./validate-jwt")
const validateRols = require("./validate-rols")
const validateFields = require("./validateFields")

module.exports = {
  ...validateJWT,
  ...validateRols,
  ...validateFields
}