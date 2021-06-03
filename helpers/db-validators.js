const Role = require("../models/role")
const User = require("../models/user")

const validRol = async (rol = "") => {
  const roleExists = await Role.findOne({ rol })
  if (!roleExists) {
    throw new Error(`Rol ${rol} is not registered on DB`)
  }
}

const emailExists = async (email = "") => {
  const exists = await User.findOne({ email })
  if (exists) {
    throw new Error(`Email ${email} already exists`)
  }
}

const userExistsById = async (id) => {
  const exists = await User.findById(id)
  if (!exists) {
    throw new Error(`user with id ${id} does not exists`)
  }
}

module.exports = {
  validRol,
  emailExists,
  userExistsById
}