
const {check, oneOf} = require("express-validator");
const UserModel = require("../models/userModel.js");

const validateID = oneOf([
    check("id") //email
        .exists()
        // To delete leading and triling space
        .trim()

        // Normalizing the email address
        .normalizeEmail()

        // Checking if follow the email
        // address format or not
        .isEmail()
        .isLength({min: 5, max:50 })

        // Custom message
        .withMessage('Email is required')
    ,
    check("id") //phone
        .exists()
        .isNumeric()
        .isLength({min: 7, max:55 })
        .withMessage("phone is required"),

        // Custom validation
        // Validate email in use or not
    check("id") // find id in DB
        .custom(async (id) => {
            const existingUser =
                await UserModel.findOne({id:id}).exec();

            if (existingUser) {
                throw new Error(`User ${id} already registered`);
            }
        }),

    check("password")
        .isNumeric()
        .withMessage("Price should be a number"),
])


export default validateID;