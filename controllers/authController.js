const userModel = require('../models/user')




const signup = async (req, res) => {
    try {
        const {
            username,
            password,
        } = req.body

        const user = await userModel.create({
            username,
            password
        })

        res.json({ message: "User was created !", id: user._id })

    } catch (error) {
        console.log("Error: ", error)
        res.status(500).json({ message: "There was an error while treating the request" })
    }
}

module.exports = { signup }