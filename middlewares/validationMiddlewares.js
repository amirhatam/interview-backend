const expressValidator = require("express-validator");
const passwordValidator = require('password-validator');


const validate = (req, res, next) => {
    const errors = expressValidator.validationResult(req)

    if (!errors.isEmpty()) {
        console.log(errors);
        res.status(400).json(errors)
    } else {
        next()
    }
}

const validationSignup = [
    expressValidator.body('password').exists().isString().custom(value => {
        const schema = new passwordValidator()

        schema
            .is().min(4)
            .is().max(30)
            .has().uppercase()
            .has().lowercase()
            .has().digits()
            .has().not().spaces()
            .is().not().oneOf(["Salut-12"])
        return schema.validate(value)

    }),
    validate
]

const validationLogin = [
    expressValidator.body('password').exists().isString(),
    validate
]

module.exports = { validationSignup, validationLogin }