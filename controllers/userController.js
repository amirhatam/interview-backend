const userModel = require('../models/user')

const getUsers = async (req, res) => {
    try {
        const users = await userModel.find()

        console.log('users', users);
        res.json(users)
    } catch (error) {
        console.log(err)

        res.status(500).json({ errorMessage: "There was a problem :(" })
    }

}

const getUserById = async (req, res) => {
    try {
        const idUser = req.params.id
        const user = await userModel.findById(idUser)

        if (user) {
            res.json({ user })
        } else {
            res.json({
                message: "User not found !"
            })
        }
    } catch (err) {
        console.log(err)

        res.status(500).json({ errorMessage: "There was a problem :(" })
    }
}


const getUser = async (req, res) => {
    try {
        const username = req.params.username.toLowerCase()
        const user = await userModel.findOne({ username: username })
        if (user) {

            res.json({
                user
            })
        } else {
            res.json({
                message: "User not found !"
            })
        }

    } catch (err) {
        console.log(err)

        res.status(500).json({ errorMessage: "There was a problem :(" })
    }
}


const updateInterview = async (req, res) => {
    try {
        const userId = req.params.id
        const user = await userModel.findById(userId)
        let result = user.interview

        const data = req.body

        result.push(data.interview)

        const userUpdate = await userModel.updateOne({ _id: userId }, { interview: result })

        res.json({
            message: "User was updated",
            userUpdate
        })
    } catch (error) {
        console.log("Error", error)
        res.status(500).json({ message: "There was a problem :(" })
    }
}


module.exports = { getUsers, getUserById, getUser, updateInterview }