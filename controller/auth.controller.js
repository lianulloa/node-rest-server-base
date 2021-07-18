const { response, request } = require("express");
const User = require("../models/user")
const bcryptjs = require("bcryptjs");
const { generateJWT } = require("../helpers/generate-jwt");
const { googleVerify } = require("../helpers/google-verify");


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

const googleSignin = async (req = request, res = response) => {

  const { id_token } = req.body

  try {
    const {name, img, email} = await googleVerify(id_token)
    let user = await User.findOne({ email })

    if (!user) {
      const data = {
        name,
        email,
        password: ":P",
        img,
        google: true
      }
      user = new User(data)
      await user.save()
    }

    if (!user.status) {
      return res.status(401).json({
        msg: "User blocked"
      })
    }

    const token = await generateJWT(user.id)

    return res.status(200).json({
      user,
      token
    })
  } catch (error) {
    res.status(400).json({
      msg: "Google's token is invalid"
    })
  }

}

module.exports = {
  login,
  googleSignin
}