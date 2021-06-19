
const { response, request } = require("express")
const User = require("../models/user")
const bcrypt = require("bcryptjs")

const userGet = async (req = request, res= response) => {
  const { limit = 5, from = 0 } = req.query
  
  const [total, users] = await Promise.all([
    User.countDocuments({ status: true }),
    await User.find({ status: true})
    .skip(Number(from))
    .limit(Number(limit))
  ])
  
  res.json({
    metadata: {
      total
    },
    users
  })
}
const userPut = async (req = request, res= response) => {
  const { id } = req.params
  const {
    _id,
    password,
    google,
    email,
    ...rest
  } = req.body

  if (password) {
    // encrypt pass
    const salt = bcrypt.genSaltSync()
    rest.password = bcrypt.hashSync(password, salt)
  }

  const user = await User.findByIdAndUpdate( id, rest)

  res.json({
    msg: "Put API - controller",
    user
  })
}
const userPost = async (req = request, res= response) => {
  
  const body = req.body
  const user = new User(body)

  // encrypt pass
  const salt = bcrypt.genSaltSync()
  user.password = bcrypt.hashSync(body.password, salt)

  await user.save()

  res.json({
    msg: "Post API - controller",
    user
  })
}
const userDelete = async (req, res= response) => {
  const { id } = req.params

  // borrar físicamente
  // const user = await User.findByIdAndDelete(id)

  const user = await User.findByIdAndUpdate(id, { status: false }, {new: true})

  res.json(user)
}



module.exports = {
  userGet,
  userPut,
  userPost,
  userDelete
}