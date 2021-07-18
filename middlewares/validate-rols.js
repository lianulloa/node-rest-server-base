const { response, request } = require("express")

const isAdminRol = (req = request, res = response, next) => {
  if (!req.user) {
    return res.status(500).json({
      msg: "Trying to verify rol without validating JWT"
    })
  }

  const { rol, name } = req.user

  if (rol !== "ADMIN_ROLE") {
    return res.status(401).json({
      msg: `${name} is not admin - Can make this action`
    })
  }
  
  next()
}

const hasRole = (...rols) => {
  return (req = request, res = response, next) => {
    if (!req.user) {
      return res.status(500).json({
        msg: "Trying to verify rol without validating JWT"
      })
    }
    if (!rols.includes(req.user.rol)) {
      return res.status(401).json({
        msg: `Service require one of these rols ${rols.join(", ")}`
      })
    }
    next()
  }
}

module.exports = {
  isAdminRol,
  hasRole
}