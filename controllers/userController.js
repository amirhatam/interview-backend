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

module.exports = { getUsers }