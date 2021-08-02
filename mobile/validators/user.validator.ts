import * as yup from "yup";

export const UserValidation = yup.object().shape({
    email: yup.string().email().typeError("Enter correct email").required(),
    password: yup.string().typeError("Incorrect password").required()
});
