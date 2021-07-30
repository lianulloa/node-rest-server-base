const { Socket } = require("socket.io")
const { checkJWT } = require("../helpers/generate-jwt")

                                  //remove this default for prod
const socketController = async (socket = new Socket()) => {
  const token = socket.handshake.headers["x-token"]
  const user = await checkJWT(token)
  if (!user) {
    return socket.disconnect()
  }
}

module.exports = {
  socketController
}