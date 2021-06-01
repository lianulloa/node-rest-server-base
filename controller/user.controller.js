
const { response, request } = require("express")

const userGet = (req = request, res= response) => {
  const query = req.query
  res.json({
    msg: "get API - controller",
    ...query
  })
}
const userPut = (req = request, res= response) => {
  const id = req.params.id
  res.json({
    msg: "Put API - controller",
    id
  })
}
const userPost = (req = request, res= response) => {
  const body = req.body
  const id = req.params.id

  res.json({
    msg: "Post API - controller",
    ...body,
    id
  })
}
const userDelete = (req, res= response) => {
  res.json({
    msg: "Delete API - controller"
  })
}



module.exports = {
  userGet,
  userPut,
  userPost,
  userDelete
}