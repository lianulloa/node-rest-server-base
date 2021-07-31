const url = "http://localhost:8080/api/auth/"

let user = null
let socket = null

const txtUid      = document.querySelector("#txtUid")
const txtMessage  = document.querySelector("#txtMessage")
const ulUsers     = document.querySelector("#ulUsers")
const ulMessages  = document.querySelector("#ulMessages")
const btnExit     = document.querySelector("#btnExit")

const validateJWT = async () => {
  const token = localStorage.getItem("token") || ""

  if (token.length <= 10) {
    window.location = "index.html"
    throw new Error("There is no token")
  }

  const res = await fetch(url, {
    headers: {"x-token": token}
  })

  const { user: userDB, token: tokenDB } = await res.json()
  localStorage.setItem("token", tokenDB)
  user = userDB
  document.title = user.name

  await connectSocket()
}

const connectSocket = async () => {
  socket = io({
    "extraHeaders": {
      "x-token": localStorage.getItem("token")
    }
  })

  socket.on("connect", () => {
    console.log("online")
  })
  socket.on("disconnect", () => {
    console.log("offline")
  })
  socket.on("receive-msg", renderMessages)
  socket.on("active-users", renderUser)
  socket.on("private-msg", console.log)
}

const renderUser = (users = []) => {
  let usersHtml = ""
  users.forEach(({name, uid}) => {
    usersHtml += `
      <li>
        <p>
          <h5 class="text-success">
            ${name}
          </h5>
          <span class="fs-6 text-muted">${uid}</span>
        </p>
      </li>
    `
  })

  ulUsers.innerHTML = usersHtml
}

const renderMessages = (messages = []) => {
  let messagesHtml = ""
  messages.forEach(({name, msg}) => {
    messagesHtml += `
      <li>
        <p>
          <span class="text-primary">
            ${name}
          </span>
          <span>${msg}</span>
        </p>
      </li>
    `
  })

  ulMessages.innerHTML = messagesHtml
}


txtMessage.addEventListener("keyup", ({keyCode}) => {
  if (keyCode !== 13) return
  const msg = txtMessage.value
  const uid = txtUid.value

  if (msg.length > 0) {//dummy validation
    socket.emit("send-msg", { msg, uid })
    txtMessage.value = ""
  }
})

const main = async () => {
  await validateJWT()
}

main()

