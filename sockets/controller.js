const { Socket } = require("socket.io")
const { checkJWT } = require("../helpers/generate-jwt")
const { ChatInfo } = require("../models")

const chatInfo = new ChatInfo()
                                  //remove this default for prod
const socketController = async (socket = new Socket(), io) => {
  const token = socket.handshake.headers["x-token"]
  const user = await checkJWT(token)
  if (!user) {
    return socket.disconnect()
  }

  chatInfo.connectUser(user)
  io.emit("active-users", chatInfo.usersArr)
  io.emit("receive-msg", chatInfo.last10)

  socket.join(user.id)


  socket.on("disconnect", () => {
    chatInfo.disconnectUser(user.id)
    io.emit("active-users", chatInfo.usersArr)
  })

  socket.on("send-msg", ({ uid, msg }) => {
    
    if (uid) {
      socket.to(uid).emit("private-msg", {
        from: user.name,
        msg
      })
    } else {
      chatInfo.sendMessage(user.id, user.name, msg)
      io.emit("receive-msg", chatInfo.last10)
    }
  })
}

module.exports = {
  socketController
}