const express = require("express")
const router = express.Router()
const { signup } = require("../controllers/authController")
const { validationSignup } = require('../middlewares/validationMiddlewares')

router.post("/signup", validationSignup, signup)


module.exports = router
