const { Router } = require("express")
const {
  userGet,
  userPost,
  userPut,
  userDelete
} = require("../controller/user.controller")

const router = Router()

router.get('/', userGet)
router.put('/:id', userPut)
router.post('/:id', userPost)
router.delete('/', userDelete)

module.exports = router