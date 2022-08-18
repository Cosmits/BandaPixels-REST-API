const {check} = require("express-validator");
const UserModel = require("../models/userModel.js");

module.exports = {

    validateEmail: check('id')

        // To delete leading and triling space
        .trim()

        // Normalizing the email address
        .normalizeEmail()

        // Checking if follow the email
        // address format or not
        .isEmail()

        // Custom message
        .withMessage('Invalid email')

        // Custom validation
        // Validate email in use or not
        .custom(async (id) => {
            const existingUser =
                await UserModel.findOne({id:id}).exec();

            if (existingUser) {
                throw new Error(`User ${id} already registered`);
            }
        })
}

