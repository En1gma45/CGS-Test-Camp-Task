import { check } from "express-validator/check";

export const RegistrationValidator = [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Please enter a password with 6 or more characters").isLength({ min: 6 })
];

export const LoginValidator = [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Please enter a correct password").exists()
];
