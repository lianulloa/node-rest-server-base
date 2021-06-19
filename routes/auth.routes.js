const { Router } = require("express")
const { check } = require("express-validator")
const { login } = require("../controller/auth.controller")
const { validateFields } = require("../middlewares/validateFields")

const router = Router()

router.post('/login', [
  check("email", "email is required").isEmail(),
  check("password", "password is required").notEmpty(),
  validateFields
], login)

module.exports = router