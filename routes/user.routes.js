const { Router } = require("express")
const { check } = require("express-validator")
const {
  userGet,
  userPost,
  userPut,
  userDelete
} = require("../controller/user.controller")
const { validRol, emailExists, userExistsById } = require("../helpers/db-validators")
const { validateFields } = require("../middlewares/validateFields")

const router = Router()

router.get('/', userGet)

router.put('/:id', [
  check("id", "not valid id").isMongoId(),
  check("id").custom(userExistsById),
  check("rol").custom(validRol),
  validateFields
], userPut)

router.post('/', [
  check("name", "name is required").not().isEmpty(),
  check("password", "password minLength 6").isLength({min: 6}),
  check("email", "not valid email").isEmail(),
  check("email").custom(emailExists),
  // check("rol", "not valid rol").isIn(["ADMIN_ROLE", "USER_ROLE"]),
  check("rol").custom(validRol),
  validateFields
], userPost)

router.delete('/:id', [
  check("id", "not valid id").isMongoId(),
  check("id").custom(userExistsById),
  validateFields
], userDelete)

module.exports = router