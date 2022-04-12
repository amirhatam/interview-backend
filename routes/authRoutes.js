const express = require("express")
const router = express.Router()
const { signup, login } = require("../controllers/authController")
const { validationSignup } = require('../middlewares/validationMiddlewares')

router.post("/signup", validationSignup, signup)

router.post("/login", login)


module.exports = router
