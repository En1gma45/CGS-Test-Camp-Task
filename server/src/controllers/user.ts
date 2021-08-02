import bcrypt from "bcryptjs";
import { Response } from "express";
import Request from "../types/Request";
import HttpStatusCodes from "http-status-codes";
import User, { IUser } from "../models/User";
import { validationResult } from "express-validator/check";
import signJWT from "../helpers/signJWT";

class UserController {
    // login
    async login (req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res
                  .status(HttpStatusCodes.BAD_REQUEST)
                  .json({ errors: errors.array() });
            }

            const user = await User.findOne({ email });

            if (!user) {
                return res
                  .status(HttpStatusCodes.UNAUTHORIZED)
                  .json({ msg: "User is not exist" });
            }

            const unHashedPassword = await bcrypt.compare(password, user.password);

            if (!unHashedPassword) {
                return res
                  .status(HttpStatusCodes.UNAUTHORIZED)
                  .json({ msg: "Password is invalid" });
            }

            signJWT(user._id, (error, token) => {
                if (error) {
                    return res
                        .status(HttpStatusCodes.UNAUTHORIZED)
                        .json({ msg: "User is not exist" });
                }
                res.json({ token, userId: user._id });
            });
        } catch (error) {
            console.error(error.message);
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
        }
    }

    // registration
    async registration (req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            const errors = validationResult(req);
            const isUsed = await User.findOne({ email });

            if (!errors.isEmpty()) {
                return res
                  .status(HttpStatusCodes.BAD_REQUEST)
                  .json({ errors: errors.array() });
            }

            if (isUsed) {
                return res
                  .status(HttpStatusCodes.BAD_REQUEST)
                  .json({ msg: "This email is already in use"  });
            }

            const hashedPassword = await bcrypt.hash(password, 12);

            const user: IUser = new User({
                email, password: hashedPassword
            });

            await user.save();
            res.json({ msg: "Created" });
        } catch (error) {
            console.error(error.message);
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
        }
    }
}

export default new UserController();
