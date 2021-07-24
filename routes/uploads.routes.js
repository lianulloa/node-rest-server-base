const { Router } = require("express")
const { check } = require("express-validator")
const { uploadFile, updateImage, showImage } = require("../controller/uploads.controller")

const { validateCollections } = require("../helpers")
const { validateUploadedFile } = require("../middlewares")
const { validateFields } = require("../middlewares/validateFields")

const router = Router()

router.post("/", validateUploadedFile, uploadFile)

router.put("/:collection/:id", [
  validateUploadedFile,
  check("id", "not a mongo id").isMongoId(),
  check("collection", "not valid collection").custom(c => validateCollections(c, ["user", "product"])),
  validateFields
], updateImage)

router.get("/:collection/:id", [
  check("id", "not a mongo id").isMongoId(),
  check("collection", "not valid collection").custom(c => validateCollections(c, ["user", "product"])),
  validateFields
], showImage)

module.exports = router