const express = require('express')
const fileUpload = require("express-fileupload")
const cors = require('cors')
const { dbConnection } = require('../db/config.db')
const { socketController } = require('../sockets/controller')

class Server {
  constructor() {
    this.app = express()
    this.port = process.env.PORT
    this.server = require("http").createServer(this.app)
    this.io = require("socket.io")(this.server)

    this.paths = {
      auth: "/api/auth",
      category: "/api/category",
      user: "/api/user",
      product: "/api/product",
      search: "/api/search",
      uploads: "/api/uploads"
    }

    this.connectToDB()

    //Middlewares
    this.middlewares()

    this.routes()

    this.sockets()
  }

  async connectToDB() {
    await dbConnection()
  }

  middlewares() {
    this.app.use(express.static("public"))
    this.app.use(cors())
    this.app.use(express.json())
    this.app.use(fileUpload({
      createParentPath: true,
      useTempFiles : true,
      tempFileDir : '/tmp/'
  }));
  }

  routes() {
    this.app.use(this.paths.auth, require("../routes/auth.routes"))
    this.app.use(this.paths.category, require("../routes/category.routes"))
    this.app.use(this.paths.user, require("../routes/user.routes"))
    this.app.use(this.paths.product, require("../routes/product.routes"))
    this.app.use(this.paths.search, require("../routes/search.routes"))
    this.app.use(this.paths.uploads, require("../routes/uploads.routes"))
  }

  sockets() {
    this.io.on("connection", socketController)
  }

  listen() {
    this.server.listen(this.port, () => {
      console.log(`Server running in http://localhost:${this.port}`, )
    })
  }
}

module.exports = Server