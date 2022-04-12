const express = require("express")
const router = express.Router()
const {
    getUsers,
    getUserById,
    getUser,
    updateInterview
} = require("../controllers/userController")



router.get("/", getUsers)

router.get("/:id", getUserById)

router.get("/username/:username", getUser)

router.patch("/:id/interviews", updateInterview)



router.all("*", (req, res) => {
    res.status(404).json({
        errorMessage: "The route was not found"
    })
})

module.exports = router
