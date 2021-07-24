const path = require("path")
const fs = require("fs")

const { request, response } = require("express");
const { uploadFileHelper } = require("../helpers");
const { User, Product } = require("../models");

const uploadFile = async (req = request, res = response) => {

  try {
    const name = await uploadFileHelper(req.files, undefined, "imgs")
    return res.json({
      name
    })
  } catch (error) {
    return res.status(400).json({
      msg: error
    })
  }

}

const updateImage = async (req = request, res = response) => {

  const { id, collection } = req.params

  let model
  switch (collection) {
    case "user":
      model = await User.findById(id)
      if (!model) {
        return res.status(400).json({
          msg: `No user with id: ${id}`
        })
      }
      break;
    case "product":
      model = await Product.findById(id)
      if (!model) {
        return res.status(400).json({
          msg: `No product with id: ${id}`
        })
      }
      break;
    default:
      return res.status(500).json({
        msg: `collection ${collection} not handled`
      })
  }

  if (model.img) {
    const imagePath = path.join(__dirname, "../uploads", collection, model.img)
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath)
    }
  }

  model.img = await uploadFileHelper(req.files, undefined, collection)
  await model.save()

  return res.json({
    model
  })
}

const showImage = async (req, res = response) => {

  const { id, collection } = req.params

  let model
  switch (collection) {
    case "user":
      model = await User.findById(id)
      if (!model) {
        return res.status(400).json({
          msg: `No user with id: ${id}`
        })
      }
      break;
    case "product":
      model = await Product.findById(id)
      if (!model) {
        return res.status(400).json({
          msg: `No product with id: ${id}`
        })
      }
      break;
    default:
      return res.status(500).json({
        msg: `collection ${collection} not handled`
      })
  }

  if (model.img) {
    const imagePath = path.join(__dirname, "../uploads", collection, model.img)
    if (fs.existsSync(imagePath)) {
      return res.sendFile(imagePath)
    }
  }

  const placeholderImagePath = path.join(__dirname, "../assets/no-image.jpg")
  if (fs.existsSync(placeholderImagePath)) {
    return res.sendFile(placeholderImagePath)
  } else {
    return res.status(500).json({
      msg: "placeholder image not found"
    })
  }


}

module.exports = {
  uploadFile,
  updateImage,
  showImage
}