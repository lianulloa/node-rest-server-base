const { response } = require("express");
const User = require("../models/user")
const bcryptjs = require("bcryptjs");
const { generateJWT } = require("../helpers/generate-jwt");


const login = async (req, res = response) => {

  const { email, password } = req.body

  try {

    const user = await User.findOne({ email })
    if (!user || !user.status) {
      return res.status(400).json({
        msg: "User/pass wrong - email"
      })
    }

    const validPass = bcryptjs.compareSync(password, user.password)
    if (!validPass) {
      return res.status(400).json({
        msg: "User/pass wrong - pass"
      })
    }

    const token = await generateJWT(user.id)

    return res.json({
      user,
      token
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      msg: "Talk to admin"
    })
  }

}

module.exports = {
  login
}