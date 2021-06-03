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
const { validateFields } = require("../middlewares/validateFields")

const router = Router()

router.get("/", categoryList)

router.get("/:id", categoryGet)

router.post("/", [
  check("name", "name is required").not().isEmpty(),
  validateFields
], categoryPost)

router.put("/:id", [
  check("id").custom(categoryExistsById),
  validateFields
], categoryPut)

router.delete("/:id", [
  check("id", "not valid id").isMongoId(),
  check("id").custom(categoryExistsById),
  validateFields
], categoryDelete)

module.exports = router