//import core modules
import express from "express";

//import user modules
import { userController } from "../controller/usercontroller.js";

export const router = express.Router();

//post routes
router.post('/login',userController.login);
router.post('/register',userController.RegisterUser);