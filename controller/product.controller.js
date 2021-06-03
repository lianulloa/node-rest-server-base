const { response, request } = require("express")
const {Product} = require("../models")

const productList = async (req = request, res = response) => {
  const { limit = 5, from = 0 } = req.query
  
  const [total, products] = await Promise.all([
    Product.countDocuments({ status: true }),
    await Product.find({ status: true })
      .populate("user", "name")
      .populate("category", "name")
      // .populate("user", ["name", "email"])
      .skip(Number(from))
      .limit(Number(limit))
  ])
  
  return res.json({
    metadata: {
      total
    },
    products
  })
}

const productGet = async (req = request, res = response) => {
  const { id } = req.params

  const product = await Product.findById(id)
    .populate("user", "name")
    .populate("category", "name")

  if (!product) {
    return res.status(404).json({
      msg: "not found"
    })
  }

  return res.json(product)
}

const productPost = async (req = request, res = response) => {
  const name = req.body.name.toUpperCase()
  const productDB = await Product.findOne({ name })
  if (productDB) {
    return res.status(400).json({
      msg: `Product ${productDB.name} already exist`
    })
  }


  const product = new Product(req.body)
  await product.save()
  
  res.status(201).json(product)
}

const productPut = async (req = request, res=response) => {
  const { id } = req.params
  const {
    name
  } = req.body

  const product = await Product.findByIdAndUpdate( id, {name: name.toUpperCase()}, {new: true})

  return res.status(202).json({
    product
  })
}

const productDelete = async (req = request, res=response) => {
  const { id } = req.params

  const product = await Product.findByIdAndUpdate(id, { status: false })

  return res.json(product)
}

module.exports = {
  productList,
  productPost,
  productGet,
  productPut,
  productDelete
}