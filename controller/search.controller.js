const { response } = require("express")
const { ObjectId } = require("mongoose").Types
const { User } = require("../models")

const collectionAvailable = [
  "users",
  "categories",
  "products",
  "roles"
]

const searchUsers = async (term = "", res = response) => {
  const isMongoId = ObjectId.isValid(term)

  if (isMongoId) {
    const user = await User.findById(term)
    return res.json({
      results: user ? [user] : []
    })
  }

  const regex = new RegExp(term, "i")

  const users = await User.find({
    // name: regex
    $or: [{ name: regex }, { email: regex }],
    $and: [{status: true}]
  })
  res.json({
    results: users
  })
}

const search = (req, res = response) => {
  const { collection, term } = req.params
  
  if (!collectionAvailable.includes(collection)) {
    return res.status(400).json({
      msg: `Available collection ${collectionAvailable}`
    })
  }

  switch (collection) {
    case "users":
      searchUsers(term, res)
      break;
    case "categories":
      
      break;
    case "products":
      
      break;
  
    default:
      res.status(500).json({
        msg: "error search"
      })
      break;
  }
}

module.exports = {
  search
}