const { Router } = require("express")
const { check } = require("express-validator")
const {
  categoryDelete,
  categoryPost,
  categoryList,
  categoryGet,
  categoryPut
} = require("../controller/category.controller")
const { categoryExistsById } = require("../helpers/db-validators")
const { validateJWT, isAdminRol } = require("../middlewares")
const { validateFields } = require("../middlewares/validateFields")

const router = Router()

router.get("/", categoryList)

router.get("/:id", [
  check("id", "not valid id").isMongoId(),
  check("id").custom(categoryExistsById),
  validateFields
], categoryGet)

router.post("/", [
  validateJWT,
  check("name", "name is required").not().isEmpty(),
  validateFields
], categoryPost)

router.put("/:id", [
  validateJWT,
  check("id", "not valid id").isMongoId(),
  check("id").custom(categoryExistsById),
  validateFields
], categoryPut)

router.delete("/:id", [
  validateJWT,
  isAdminRol,
  check("id", "not valid id").isMongoId(),
  check("id").custom(categoryExistsById),
  validateFields
], categoryDelete)

module.exports = router