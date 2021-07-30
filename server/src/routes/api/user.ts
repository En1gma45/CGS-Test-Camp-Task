import { Router } from "express";
import { RegistrationValidator, LoginValidator } from "../../validation/user.validation";
import UserController from '../../controllers/user'

const router: Router = Router();

// @route   POST api/user
// @desc    Register user given their email and password, returns the token upon successful registration
// @access  Public
router.post("/login", LoginValidator, UserController.login);
router.post("/registration", RegistrationValidator, UserController.registration);

export default router;
