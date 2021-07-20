const { Router } = require("express")
const { check } = require("express-validator")
const { uploadFile } = require("../controller/uploads.controller")

const { validateFields } = require("../middlewares/validateFields")

const router = Router()

router.post("/", uploadFile)

module.exports = router