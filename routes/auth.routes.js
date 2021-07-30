const { Router } = require("express")
const { check } = require("express-validator")
const { login, googleSignin, renewToken } = require("../controller/auth.controller")
const { validateJWT } = require("../middlewares/validate-jwt")
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

router.get("/", validateJWT, renewToken)

module.exports = router