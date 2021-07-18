const { Router } = require("express")
const { check } = require("express-validator")
const { login, googleSignin } = require("../controller/auth.controller")
const { validateFields } = require("../middlewares/validateFields")

const router = Router()

router.post('/login', [
  check("email", "email is required").isEmail(),
  check("password", "password is required").notEmpty(),
  validateFields
], login)

router.post('/google', [
  check("id_token", "id_token is required").notEmpty(),
  validateFields
], googleSignin)

module.exports = router