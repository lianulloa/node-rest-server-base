const express = require('express')
const cors = require('cors')
const { dbConnection } = require('../db/config.db')

class Server {
  constructor() {
    this.app = express()
    this.port = process.env.PORT
    this.paths = {
      auth: "/api/auth",
      category: "/api/category",
      user: "/api/user",
      product: "/api/product",
      search: "/api/search"
    }

    this.connectToDB()

    //Middlewares
    this.middlewares()

    this.routes()
  }

  async connectToDB() {
    await dbConnection()
  }

  middlewares() {
    this.app.use(express.static("public"))
    this.app.use(cors())
    this.app.use(express.json())
  }

  routes() {
    this.app.use(this.paths.auth, require("../routes/auth.routes"))
    this.app.use(this.paths.category, require("../routes/category.routes"))
    this.app.use(this.paths.user, require("../routes/user.routes"))
    this.app.use(this.paths.product, require("../routes/product.routes"))
    this.app.use(this.paths.search, require("../routes/search.routes"))
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server running in http://localhost:${this.port}`, )
    })
  }
}

module.exports = Server