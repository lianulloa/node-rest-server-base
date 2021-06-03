const { Router } = require("express")
const { check } = require("express-validator")
const {
  productDelete,
  productPost,
  productList,
  productGet,
  productPut
} = require("../controller/product.controller")
const { productExistsById,categoryExistsById } = require("../helpers/db-validators")
const { validateFields } = require("../middlewares/validateFields")

const router = Router()

router.get("/", productList)

router.get("/:id", productGet)

router.post("/", [
  check("name", "name is required").not().isEmpty(),
  check("category", "not valid category_id").isMongoId(),
  check("category").custom(categoryExistsById),
  validateFields
], productPost)

router.put("/:id", [
  check("id").custom(productExistsById),
  validateFields
], productPut)

router.delete("/:id", [
  check("id", "not valid id").isMongoId(),
  check("id").custom(productExistsById),
  validateFields
], productDelete)

module.exports = router