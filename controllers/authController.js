const userModel = require('../models/user')
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")



const signup = async (req, res) => {
    try {
        const {
            username,
            password,
        } = req.body
        const passwordHashed = bcryptjs.hashSync(password)

        const user = await userModel.create({
            username,
            password: passwordHashed
        })

        res.json({ message: "User was created !", id: user._id })

    } catch (error) {
        console.log("Error: ", error)
        res.status(500).json({ message: "There was an error while treating the request" })
    }
}

const login = async (req, res) => {
    const tokenExpire = "4h"
    try {
        const username = req.body.username
        const password = req.body.password
        const validUser = await userModel.findOne({ username: username })

        const result = bcryptjs.compareSync(password, validUser.password)

        if (result) {
            const token = jwt.sign(
                {
                    id: result._id
                }, "secret",
                {
                    expiresIn: tokenExpire
                })

            console.log("token , tokenExpire", token, tokenExpire)

            res.status(200).json({
                message: "User connected !", validUser,
                token,
                tokenExpire
            })
        } else {
            res.status(401).json({ message: "Login failed" })
        }

    } catch (error) {
        console.log("Error: ", error)
        res.status(500).json({ message: "There was an error while treating the request" })
    }

}



module.exports = { signup, login }