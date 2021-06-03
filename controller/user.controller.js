
const { response, request } = require("express")
const User = require("../models/user")
const bcrypt = require("bcryptjs")

const userGet = (req = request, res= response) => {
  const query = req.query
  res.json({
    msg: "get API - controller",
    ...query
  })
}
const userPut = (req = request, res= response) => {
  const id = req.params.id
  res.json({
    msg: "Put API - controller",
    id
  })
}
const userPost = async (req = request, res= response) => {
  
  const body = req.body
  const user = new User(body)

  //check email
  const emailExist = await User.findOne({ email: body.email })
  if (emailExist) {
    return res.status(400).json({
      msg: "Email exists"
    })
  }

  // encrypt pass
  const salt = bcrypt.genSaltSync()
  user.password = bcrypt.hashSync(body.password)

  await user.save()

  res.json({
    msg: "Post API - controller",
    user
  })
}
const userDelete = (req, res= response) => {
  res.json({
    msg: "Delete API - controller"
  })
}



module.exports = {
  userGet,
  userPut,
  userPost,
  userDelete
}