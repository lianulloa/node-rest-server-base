const { response, request } = require("express")
const jwt = require("jsonwebtoken")
const { User } = require("../models")

const validateJWT = async (req=request, res = response, next) => {
  const token = req.header("x-token")

  if (!token) {
    return res.status(401).json({
      msg: "token required"
    })
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRET)
    req.uid = uid
    const user = await User.findById(uid)

    if (!user) {
      return res.status(401).json({
        msg: "invalid token - user not in db"
      })
    }

    if (!user.status) {
      return res.status(401).json({
        msg: "invalid token - status: false"
      })
    }

    req.user = user
    
    next()
  } catch (error) {
    console.log(error)
    res.status(401).json({
      msg: "invalid token"
    })
  }

}

module.exports = {
  validateJWT
}