const express = require('express')
const cors = require('cors')
const { dbConnection } = require('../db/config.db')

class Server {
  constructor() {
    this.app = express()
    this.port = process.env.PORT
    this.userPath = "/api/user"

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
    this.app.use(this.userPath, require("../routes/user.routes"))
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server running in http://localhost:${this.port}`, )
    })
  }
}

module.exports = Server