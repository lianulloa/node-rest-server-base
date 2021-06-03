const { Router } = require("express")
const { check } = require("express-validator")
const {
  userGet,
  userPost,
  userPut,
  userDelete
} = require("../controller/user.controller")
const { validateFields } = require("../middlewares/validateFields")
const Role = require("../models/role")

const router = Router()

router.get('/', userGet)
router.put('/:id', userPut)
router.post('/', [
  check("name", "name is required").not().isEmpty(),
  check("password", "password minLength 6").isLength({min: 6}),
  check("email", "not valid email").isEmail(),
  // check("rol", "not valid rol").isIn(["ADMIN_ROLE", "USER_ROLE"]),
  check("rol").custom(async (rol = "") => {
    const roleExists = await Role.findOne({ rol })
    if (!roleExists) {
      throw new Error(`Rol ${rol} is not registered on DB`)
    }
  }),
  validateFields
], userPost)
router.delete('/', userDelete)

module.exports = router