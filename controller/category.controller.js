const { response, request } = require("express")
const {Category} = require("../models")

const categoryList = async (req = request, res = response) => {
  const { limit = 5, from = 0 } = req.query
  
  const [total, categories] = await Promise.all([
    Category.countDocuments({ status: true }),
    await Category.find({ status: true })
      .populate("user", "name")
      // .populate("user", ["name", "email"])
      .skip(Number(from))
      .limit(Number(limit))
  ])
  
  return res.json({
    metadata: {
      total
    },
    categories
  })
}

const categoryGet = async (req = request, res = response) => {
  const { id } = req.params

  const category = await Category.findById(id)
    .populate("user", "name")

  if (!category) {
    return res.status(404).json({
      msg: "not found"
    })
  }

  return res.json(category)
}

const categoryPost = async (req = request, res = response) => {
  const name = req.body.name.toUpperCase()
  const categoryDB = await Category.findOne({ name })
  if (categoryDB) {
    return res.status(400).json({
      msg: `Category ${categoryDB.name} already exist`
    })
  }

  const data = {
    name,
    user: req.body.user
  }

  const category = new Category(data)
  await category.save()
  
  res.status(201).json(category)
}

const categoryPut = async (req = request, res=response) => {
  const { id } = req.params
  const {
    name
  } = req.body

  const category = await Category.findByIdAndUpdate( id, {name: name.toUpperCase()}, {new: true})

  return res.status(202).json({
    category
  })
}

const categoryDelete = async (req = request, res=response) => {
  const { id } = req.params

  const category = await Category.findByIdAndUpdate(id, { status: false })

  return res.json(category)
}

module.exports = {
  categoryList,
  categoryPost,
  categoryGet,
  categoryPut,
  categoryDelete
}