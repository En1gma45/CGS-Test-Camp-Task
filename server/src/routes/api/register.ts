import {Response, Router} from "express";
import {check, validationResult} from "express-validator/check";
import Request from "Request";
import HttpStatusCodes from "http-status-codes";
import User from "../../models/User";


const router: Router = Router();



router.post('/',
    [
        check('email', 'Enter valid e-mail').isEmail(),
        check('password', 'Enter valid password').isLength({min: 5, max: 20})
    ],
    async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res
                .status(HttpStatusCodes.BAD_REQUEST)
                .json({errors: errors.array()});
        }
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).send('That user already exists!');
        } else {
            user = new User({
                email: req.body.email,
                password: req.body.password
            });
            await user.save();
            res.send(user);
        }

})









export default router;