const { Category, User, Product } = require("../models")
const Role = require("../models/role")

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

const categoryExistsById = async (id) => {
  const exists = await Category.findById(id)
  if (!exists) {
    throw new Error(`category with id ${id} does not exists`)
  }
}

const productExistsById = async (id) => {
  const exists = await Product.findById(id)
  if (!exists) {
    throw new Error(`product with id ${id} does not exists`)
  }
}

const validateCollections = (collection, collections = []) => {
  if (!collections.includes(collection)) {
    throw new Error(`Collection ${collection} is not valid - ${collections}`)
  }
  return true
}

module.exports = {
  validRol,
  emailExists,
  userExistsById,
  categoryExistsById,
  productExistsById,
  validateCollections
}